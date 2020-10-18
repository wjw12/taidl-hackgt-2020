import React, { useEffect, useReducer } from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { LinearGradient } from 'expo-linear-gradient'

import { XDAI, USD, CONVERSION_RATE, PLACEHOLDER_ADDRESS, PLACEHOLDER_AMOUNT, POLL_INTERVAL } from "../constants"

import { getBalance } from "../api/address";
import { getUserAddress } from "../api/user";
import { initialState, reducer } from "../reducers/wallet"
import usePoller from "../hooks/poller"


function HomeScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(() => {
    async function fetchData() {
      dispatch({type: "LOADING"})

      try {
        var userId = null
        while (!userId) { 
          userId = await AsyncStorage.getItem('userId'); 
          await sleep(300); 
        }
        console.log("user is", userId); 
        dispatch({type: "SET_USERID", payload: {userId: userId}})

        const address = await getUserAddress(userId)
        dispatch({type: "ADDRESS_LOADED", payload: {address: address}})
        
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      if (!state.address) return
      dispatch({type: "LOADING"})

      try {
        const balance = await getBalance(state.address)
        dispatch({type: "BALANCE_LOADED", payload: {balance: balance}})
      } catch (e) {
        dispatch({type: "ERROR"})
      }
    }

    fetchData()
  }, [state.address])

  const pollBalance = async () => {
    if(state.address){
      let newBalance = await getBalance(state.address)
      if(newBalance !== state.balance){
        dispatch({type: "BALANCE_LOADED", payload: {balance: newBalance}})
      }
    }
  }
  usePoller(pollBalance, POLL_INTERVAL)

    return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['rgba(0,191,164,1)', 'rgba(146,210,224,1)', 'rgba(203,211,244,1)']}
        locations={[0, 0.65, 0.95]}
        start={{x: 0.9, y: 0.9}}
        end={{x:0.3, y: 0.1}}
        style={styles.top}>
          
        <View style={styles.imageholder}>
        </View>
        <Text style={styles.titleText}>{state.loading || state.error ? PLACEHOLDER_AMOUNT : state.balance}{XDAI}</Text>
        <Text style={styles.text}>{"≈"+USD}{state.loading || state.error ? PLACEHOLDER_AMOUNT : (state.balance*CONVERSION_RATE).toFixed(2) }</Text>
        <View style={styles.buttonView}>
            <Button
                title="Top Up"
                color='#00BFA4'>
                  <Text style={styles.text}>Top Up</Text>
                </Button>
            
        </View>
      </LinearGradient>
      <TouchableOpacity
        style={[styles.touchable, {
            backgroundColor: '#00BFA4',
            borderColor: '#00BFA4',
            borderWidth: 1,
        }]}
        onPress={() => {navigation.navigate('RecipientScreen')}}
      >
      <Text style={[styles.textSign, {
          color:'white'
      }]}>Send</Text>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => {navigation.navigate('RequestScreen')}}
          style={[styles.touchable, {
            backgroundColor: '#00BFA4',
            borderColor: '#00BFA4',
            borderWidth: 1,
        }]}
      >
          <Text style={[styles.textSign, {
              color: 'white'
          }]}>Request</Text>
      </TouchableOpacity>
      <View style={styles.bottomholder}>
      </View>
    </View>
    
    );
  }

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "#fff",
    },
    top: {
      flex: 0.5,
      borderWidth: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      //padding: 10,
      margin: 20,
      paddingBottom: 0
    },
    imageholder: {
        flex: 0.5,
        color: 'rgba(0,0,0,0)',
        borderWidth: 0,
        margin: 20,
      },
    titleText:{
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: 'white',
        padding: 5,
    },
    text:{
        fontSize: 15,
        textAlign: "center",
        color: 'white',
    },
    buttonView:{
        backgroundColor: '#d1f3ef',
        alignSelf: 'flex-end',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        margin: 20,
        marginBottom: 0,
        marginTop: 0,
        bottom: 0
    },
    touchable:{
      flex: 0.09,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      margin: 20,
      marginBottom: 5,
      marginTop: 5
    },
    bottomholder:{
      flex: 0.3,
      backgroundColor: 'white',
    }
  });