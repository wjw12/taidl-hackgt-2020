import AsyncStorage from '@react-native-community/async-storage';
var ethers = require('ethers');
const ProviderEngine = require('web3-provider-engine')
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js')
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js')
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet-ethtx.js')
// const VmSubprovider = require('web3-provider-engine/subproviders/vm.js')
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')

const sigUtil = require('eth-sig-util')

let metaAccount;

async function BurnerProvider({namespace}, {privateKey}, {mnemonic}, {index}, {rpcUrl}){
  var opts = {
      namespace: namespace,
      privateKey: privateKey,
      mnemonic: mnemonic,
      index: index,
      rpcUrl: rpcUrl
  }
  console.log("-----------options", opts)
  var engine = new ProviderEngine()
  let provider = new ethers.providers.Web3Provider(engine)

  let privateKeyStorageString = "metaPrivateKey"
  if(namespace){
    privateKeyStorageString = privateKeyStorageString+"_"+namespace
  }

  if(privateKey){
    //if they passed in a private key, use it to generate an account
    //metaAccount = provider.eth.accounts.privateKeyToAccount(opts.privateKey)
    metaAccount = new ethers.Wallet(privateKey, provider);
    //console.log("metaAccount from pk",metaAccount)
  } else {

    let metaPrivateKey;
    try {
        metaPrivateKey = await AsyncStorage.getItem(privateKeyStorageString)
    }
    catch(e) { console.log("fail to get storage", e); }
    
    if(metaPrivateKey=="0") metaPrivateKey=false;
    if(metaPrivateKey && metaPrivateKey.length!==66) metaPrivateKey=false;
    //if(metaPrivateKey) metaAccount = provider.eth.accounts.privateKeyToAccount(metaPrivateKey)
    if(metaPrivateKey) metaAccount = new ethers.Wallet(metaPrivateKey, provider);
  }
  

  if(!metaAccount){
    //generate account either from a provided mnemonic, pk, or random generation
    if(mnemonic){
      const bip39 = require('bip39');
      const hdkey = require('ethereumjs-wallet/hdkey');
      let index = "0"
      if(typeof index != "undefined"){
        index = index
      }
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const hdwallet = hdkey.fromMasterSeed(seed);
      const wallet_hdpath = "m/44'/60'/0'/0/";
      const wallet = hdwallet.derivePath(wallet_hdpath + index).getWallet();
      const privateKey ="0x"+wallet.getPrivateKey().toString("hex")
      //metaAccount = provider.eth.accounts.privateKeyToAccount(privateKey)
      metaAccount = new ethers.Wallet(privateKey, provider);
    }else{
      //metaAccount = provider.eth.accounts.create();
      metaAccount = ethers.Wallet.createRandom()
    }
    //if we needed to generate, save the pk to local storage
    try {
        await AsyncStorage.setItem(privateKeyStorageString,metaAccount.privateKey)
    } catch (e) { console.log("fail to set storage", e); }
  }

  const getPrivateKey = (address,cb)=>{
    if(address.toLowerCase()==metaAccount.address.toLowerCase()){
      cb(null,Buffer.from(metaAccount.privateKey.replace("0x",""),'hex'))
    }else{
      cb("unknown account")
    }
  }

  const getAccounts = (cb)=>{
    //console.log("metaAccount",metaAccount)
    cb(false,[metaAccount.address])
  }

  // static results
  engine.addProvider(new FixtureSubprovider({
    web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
    net_listening: true,
    eth_hashrate: '0x00',
    eth_mining: false,
    eth_syncing: true,
  }))


  // cache layer
  engine.addProvider(new CacheSubprovider())

  // filters
  engine.addProvider(new FilterSubprovider())

  // pending nonce
  engine.addProvider(new NonceSubprovider())

  // vm
  // engine.addProvider(new VmSubprovider())

  // id mgmt
  const hookedWalletSubprovider = new HookedWalletSubprovider(opts)

  hookedWalletSubprovider.signTypedMessage = function (msgParams, cb) {
    getPrivateKey(msgParams.from, function(err, privateKey) {
      if (err) return cb(err)
      const serialized = sigUtil.signTypedData_v4(privateKey, msgParams)
      cb(null, serialized)
    })
  }
  engine.addProvider(hookedWalletSubprovider)

  engine.addProvider(new RpcSubprovider(opts))

  // start polling for blocks
  engine.start()

  console.log("-----------engine", engine)

  return engine
}


export default BurnerProvider;
