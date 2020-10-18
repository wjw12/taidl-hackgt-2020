import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useReducer, useState } from 'react';
import { 
    View, 
    Text, 
    Button,
    TextInput,
    StyleSheet
} from 'react-native';

import SectionListStyle from '../styles/sectionList'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

function NewRecipientScreen({ navigation }) {
  const [recv, setRecv] = useState()
  const [recvAddr, setRecvAddr] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        var userId = null, addr = null
        while (!userId) { 
          userId = await AsyncStorage.getItem('receipient');
        }

        console.log("user is", userId); 
        while (!addr) {
          addr = await AsyncStorage.getItem('receipientAddress');
        }

        console.log("recv addr", addr)

        setRecv(userId)
        setRecvAddr(addr)
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }
    fetchData()
  }, [])

    return (
      <View style={{ flex: 1 }}>
        <View style={[SectionListStyle.row, {margin: 'auto'}]}>
          <Text style={{padding: 10}}>
            Receipient user ID or xDai address
          </Text>
        </View>

        <View style={[SectionListStyle.row, {margin: 'auto'}]}>
          <Text style={{padding: 10, fontWeight: 'bold'}}>{recv}</Text>
        </View>

        <View style={[SectionListStyle.row, {margin: 'auto'}]}>
          <FontAwesome style={styles.icon} name="circle" color="#d1f3ef" size={75}/>
        </View>
        
        <View style={[SectionListStyle.row, {margin: 'auto'}]}>
          <Text style={{padding: 10}}>{recvAddr}</Text>
        </View>

        <View style={[SectionListStyle.row, {margin: 'auto'}]}>
          <Text style={{padding: 10}}>
            Amount
          </Text>
        </View>
        <View style={[SectionListStyle.row, {margin: 'auto'}]}>
          <TextInput
            style={styles.textInput}
            placeholder="xDai"
            maxLength={20}
          />
        </View>

        <Button
          title="Send"
          style={styles.buttonView}
          onPress={() => navigation.navigate('SentConfirmScreen')}
        />

      </View>
    );
  }

export default NewRecipientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },

  buttonView:{
      alignSelf: 'flex-end',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      margin: 20,
      marginBottom: 0,
      marginTop: 0,
      bottom: 0,
      backgroundColor: '#00bfa4'
  },

  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  }

})