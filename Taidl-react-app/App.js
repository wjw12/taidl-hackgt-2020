//import * as React from "react";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import useUserProvider from "./hooks/UserProvider";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useUserAddress } from "eth-hooks";
import { providerUrl, DEBUG } from "./config"


if(DEBUG) console.log("🏠 Connecting to provider:", providerUrl);
const localProvider = new JsonRpcProvider(providerUrl);

export default function App() {
  const userProvider = useUserProvider(localProvider);
  const address = useUserAddress(userProvider);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Universal React with Expo</Text>
      <Text>'${address}'</Text>
    </View>
  );
}
