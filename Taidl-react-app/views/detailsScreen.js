import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    Image,
    Button, 
    ScrollView,
    SectionList
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import SectionListStyle from '../styles/sectionList'
import RecentTransactions from '../model/recent'
import { randInt } from '../utils'

const NUM_THIS_WEEK = randInt(3) + 1
const NUM_LAST_WEEK = randInt(5) + 2

const styles = SectionListStyle

let l1 = [], l2 = []
let n = RecentTransactions.length
for (let i = 0; i < NUM_THIS_WEEK; ++i) {
  let item = RecentTransactions[randInt(n)]
  item.isSender = randInt(2) > 0 
  l1.push(item)
}
for (let i = 0; i < NUM_LAST_WEEK; ++i) {
  let item = RecentTransactions[randInt(n)]
  item.isSender = randInt(2) > 0 
  l2.push(item)
}

let thisWeek = l1
let lastWeek = l2

function DetailsScreen({ navigation }) {
  const renderItem = ({item}) => {
    console.log(item)
    const amount = (item.isSender ? '+ ' : '- ') + item.amount.toFixed(2).toString() + " xDai"
    //const filename = item.userId == "Taidl User" ? 'anonymous.jpg' : 'user' + (randInt(10)+1).toString() + '.jpg'
    //const uri = "https://storage.googleapis.com/jiewen.wang/temp/images/" + filename
    return (
      <View style={styles.row}>
        <FontAwesome style={styles.icon} name="circle" color="#d1f3ef" size={75}/>

        <View style={{
          flex: 5,
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}>
          <View style={{flex: 5, flexDirection: 'row', margin: 'auto', height: '100%'}}>
      <Text style={styles.userName}>{item.userId}</Text>
          </View>
          <View style={{flex: 2, flexDirection: 'row', margin: 'auto', height: '100%'}}>
            <Text style={styles.amount}>{amount}</Text>
          </View> 
        </View>
      </View>
    )
  }

    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'This Week', data: thisWeek},
            {title: 'Last Week', data: lastWeek},
          ]}
          renderItem={renderItem}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <Text>Details Screen</Text>
      //   <Button
      //     title="Go to Details... again"
      //     onPress={() => navigation.navigate('Details')}
      //   />
      // </View>
    );
  }

export default DetailsScreen;
