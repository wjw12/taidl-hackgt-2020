//import * as React from "react";
import React, { useCallback, useEffect, useState } from "react";
import { useAsync } from "react-async"
import { View, Text } from "react-native";
import { Address, Balance, Payment } from "./components"
import useUserProvider from "./hooks/UserProvider";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useUserAddress } from "eth-hooks";
import { ethers } from "ethers";
import BurnerProvider from "./helpers/BurnerProvider"
import { PROVIDER_URL, DEBUG, INFURA_ID } from "./config"


if(DEBUG) console.log("🏠 Connecting to provider:", PROVIDER_URL);
const localProvider = new JsonRpcProvider(PROVIDER_URL);

const testAsync = async () => { return await BurnerProvider(); }

export default function App() {
  const userProvider = useUserProvider(localProvider);
  const [injectedProvider, setInjectedProvider] = useState();
  const address = useUserAddress(injectedProvider);
  const { burnerProvider, error, isPending } = useAsync({ 
    promiseFn: testAsync, // the function is never called?????
    rpcUrl: "https://mainnet.infura.io/v3/"+INFURA_ID
  })

  // useEffect(() => {
  //   console.log("use eff", injectedProvider)
  //   if (burnerProvider) {
  //     console.log("use eff inner", burnerProvider)
  //     setInjectedProvider(new ethers.providers.Web3Provider(burnerProvider))
  //   }
  // });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Universal React with Expo</Text>
      <Address value={address} provider={userProvider}/>
      <Balance address={address} provider={userProvider}/>
      <Payment address={address} provider={userProvider} />
    </View>
  );
}
