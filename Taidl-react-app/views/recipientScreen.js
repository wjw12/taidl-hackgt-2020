import React, { useEffect, useState, useReducer } from 'react';
import { 
    View, 
    Text, 
    Image,
    Button, 
    StyleSheet,
    ScrollView,
    TouchableOpacity, 
    SectionList
} from 'react-native';

import Contacts from '../model/contacts'
import { randInt } from '../utils'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SectionListStyle from '../styles/sectionList'
import { reducer, initialState } from '../reducers/wallet'
import { getUserAddress } from "../api/user";
import AsyncStorage from '@react-native-community/async-storage';
//import QR from 'qrcode.react';

const NUM_RECENT = 2
const NUM_CONTACTS = Contacts.length

const styles = SectionListStyle

let recents = []
let contacts = []

for (let i = 0; i < NUM_RECENT; i++) {
  recents.push(Contacts[randInt(10)])
}
for (let i = 0; i < NUM_CONTACTS; i++) {
  contacts.push(Contacts[i])
}

function RecipientScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const renderItem = ({item}) => {
    return (
      <View style={styles.row}>
        <FontAwesome style={styles.icon} name="circle" color="#d1f3ef" size={75}/>

        <TouchableOpacity style={{
          flex: 5,
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}
        
        onPress={() => {
          AsyncStorage.setItem('receipient', item.userId).then(() => {
            return getUserAddress(item.userId)
          }).then((addr) => {
            AsyncStorage.setItem('receipientAddress', addr)
          })
          navigation.navigate('NewRecipientScreen')}
        }>
          <View style={{flex: 5, flexDirection: 'row', margin: 'auto', height: '100%'}}>
            <Text style={styles.boldUserName}>{item.userId}</Text>
          </View>

          <View style={{flex: 2, flexDirection: 'row', margin: 'auto', height: '100%'}}>
          </View> 

        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{flex: 1, paddingTop: 0}}>
      <View style={styles.row}>
          <TouchableOpacity
              onPress={() => {navigation.navigate('QRScanScreen')}}
              style={{textAlign: 'center', margin: 'auto', height: 60}}
          >
              <Text style={{color: "#00bfa4", fontSize: 18, fontWeight: 'bold'}}>Scan QR Code</Text>
          </TouchableOpacity>
      </View>

      <SectionList
        sections={[
          {title: 'Send Again', data: recents},
          {title: 'My Contacts', data: contacts},
        ]}
        renderItem={renderItem}
        renderSectionHeader={({section}) => { if (section.title) return <Text style={styles.sectionHeader}>{section.title}</Text>}}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
    // return (
    // <View style={styles.container}>
    //     <Text>Receive Screen</Text>
    //     <Button
    //       title="new recipient"
    //       onPress={() => navigation.navigate('NewRecipientScreen')}
    //     />
    //     <Button
    //       title="qr scan"
    //       onPress={() => navigation.navigate('QRScanScreen')}
    //     />

    // </View>
    // );
  }

export default RecipientScreen;
