# 进度
导入了一堆相关的hook，安装了一些dependencies

最重要的问题：如何make transaction还不会

transaction依赖于生成一个wallet

在helpers/BurnerProvider有相关code，但是在App.js里面还没法调用async function

需要两个provider，一个用来连接infura.io的API，一个用来生成本地钱包

参考代码在scaffold-eth/react-app/src/components/Account.js

# 技术checklist
- [ ] 如何make a transaction - 用helpers/Transactor，需要本地private key
- [ ] 新建address - 在helpers/BurnerProvider里面有生成address和key的方法
- [ ] 把收款信息放进二维码 - react有QR code模块

# Run React app
- npm start
- yarn run ios/npm run ios or yarn run android/npm run android

# UI libraries
- https://material-ui.com/zh/
- https://ant.design/
- https://react-bootstrap.github.io/
- https://rebassjs.org/

# Important resources
- https://github.com/expo/create-react-native-app 用这个bootstrap. Expo是一个线上开发运行react native的平台
- https://github.com/austintgriffith/scaffold-eth 用来操作区块链相关，对我们特别有用的是提供的一些components https://github.com/austintgriffith/scaffold-eth#-components 还有hooks https://github.com/austintgriffith/scaffold-eth#-hooks
- 有用的源代码主要在这里 https://github.com/austintgriffith/scaffold-eth/tree/master/packages/react-app/src 有一些跟blockchain相关的配置 environment variables暂时先无视
- NCR关于这次hackathon的页面 https://hackgt.ncrcloud.com/dashboard
- NCR Developer API列表 https://developer.ncrcloud.com/portals/dev-portal/api-explorer/details/8849/documentation?proxy=bsp-tdm-transaction-document-v2&path=get_transaction-documents_id_receipt
- NCR Selling Service入门，提供一些支付和用户管理相关API https://hackgt.ncrcloud.com/assets/files/SellingService.pdf

# Taidl Design Doc

## Goal
Tidal is a xDAI wallet app that enables people to use cryptocurrency (xDAI stablecoin) in day-to-day spending.

## Main features
- Fast (within 10 seconds) transfer to worldwide users
- Free in-network transfers and very low transfer fees via xDAI blockchain (a high-performance sidechain of Ethereum)
- Scan QR code to make a payment
- Address book to save recent contacts
- One unique ID, multiple accounts for different purposes
- Anonymous transfer
- Support conversion to and from fiat (USD, GBP, EUR, AUD)

## Types of xDAI transfer
1. In-network: transfer between Tidal users is in-network. 
- zero fees (Tidal pays for it)
- User ID appears as the sender and receipient, unless in an anonymous transfer
- mobile push notification
- visible on Blockscout (it's a real transfer via blockchain, everyone can witness it)

2. Out-network (via blockchain): transfer with any xDAI address
- small fees (500 transactions cost about $0.01)
- xDAI address appears as the sender and receipient
- user can fund their accounts via blockchain

## Account structure
When a user registers with Tidal, a unique user ID (Tidal ID) is chosen. Tidal ID will appear in every in-network transaction unless the transaction is specified as anonymous. Tidal users can transfer xDAI to another user by the user ID.

A user ID associates with multiple accounts. By default, upon successful registration, a default account is auto generated. An account in its essence is an Ethereum address (Note: xDAI sidechain shares the same address as Eth addr), however we prefer to use the term "account" in the app to simplify the concept by mimicing the way traditional personal finance app works.

User can create multiple accounts, which essentially creates multiple ETH address. User can choose which account to use when making a payment.

Each account (ETH address) has a private key. Whoever owns the key owns the access to the money of the address. By default, the private key is maintained by Tidal server so that users do not need to bear the burden of storing private keys (mnemonic phrases) at the risk of losing or leaking them. However we should provide options to users who want to self-manage the private keys.

There are two modes of key management:
- managed by Tidal: the key is securely stored in Tidal server. User is still able to export the private key and keep a local copy.
- managed by user: the key is deleted from Tidal server. User must keep the key in safe and accessible place otherwise the money is lost. This feature is for advanced users only, so the entry point should not appear in main UI but hide in some menu.

When user logs in a different device, those accounts with Tidal-managed keys will be avaiable to use immediately. Those accounts with self-managed keys will appear in the app but inactive (Because Tidal server does not have the keys). Only after user imports the private  keys (type in the mnemonic phrases) can they be activated.

Information associated with an account:
- whether is default (one user ID can only have 1 default account. It will be used as the default method for receiving payment)
- whether is anonymous - by default every account is not anonymous, which means when making a transfer the sender name will be user ID. And when receiving an in-network payment the receipient name shows user ID. User can set an account to anonymous then the account name appears as "Tidal User" as sender and receipient. 
- account label (e.g. default, savings, secret wallet). Only visible to local user. User can name whatever they like, but no duplicates.
- key management mode
- account address (Eth address): normally it's not very useful for in-network transfer unless anonymous

## How to make a payment (to another Tidal user, or a ETH address)
Several ways:
1. type receipient user ID, and send
2. scan a QR code, the code includes the ETH address. Or paste an ETH address. Tidal checks if it belongs to a Tidal user. If yes, the receipient name shows the Tidal ID or "Tidal User" if that account is anonymous.
3. select a contact from address book, and send

Sender can send in either anonymous mode or not. The rule is:
1. By default, transfers from an anonymous account is anonymous, named account is named
2. User can click a checkbox to make the transfer anonymous

In a transfer preview page, the user is able to preview the transaction amount, the estimated arrival time (let's just generate a random number a few seconds), and see the sender name and receipient name (Tidal ID, or "Tidal User", or ETH address)


# 参考
## Coinbase钱包
How do I protect against losing access to my funds?

Coinbase Wallet is a user-controlled, non-custodial product. The app generates a 12 word recovery phrase which is what gives you, and only you, access to your account to move received funds. Coinbase will never have access to this seed, meaning that we cannot move funds on your behalf even if you lose access to your recovery phrase.
We built an encrypted Google Drive and iCloud recovery phrase backup feature to help protect against seed loss. We encourage you to back up your recovery phrase using both the cloud backup feature as well as writing down your recovery phrase and storing it in a secure location. To access the backup features, tap Settings, and then Recovery Phrase.
