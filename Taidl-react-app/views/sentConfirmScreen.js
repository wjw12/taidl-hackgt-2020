import React, {useEffect} from 'react';
import { 
    View, 
    Text, 
    Button
} from 'react-native';

import { getUserAddress } from "../api/user";
import { transfer } from "../api/transfer"
import AsyncStorage from '@react-native-community/async-storage';

function SentConfirmScreen({ navigation }) {
  useEffect(() => {
    async function makeTransfer() {
      try{
        let from = await AsyncStorage.getItem('userId')
        let fromAddr = await getUserAddress(from)
        let toAddr = await AsyncStorage.getItem('receipientAddress')
        let amount = await AsyncStorage.getItem('amount')
        if (fromAddr && toAddr && amount) { console.log("transfer", fromAddr, toAddr, amount); await transfer(fromAddr, toAddr, amount) }

      } catch (e) { console.log(e); throw e; }
    }

    makeTransfer()
  }, [])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Transaction Confirmed</Text>

      </View>
    );
  }

export default SentConfirmScreen;