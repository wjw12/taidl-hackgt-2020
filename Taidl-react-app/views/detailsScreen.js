import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    SectionList
} from 'react-native';
import { AuthContext } from '../components/context';

import RecentTransactions from '../model/recent'
import { randInt } from '../utils'

const NUM_THIS_WEEK = randInt(3) + 1
const NUM_LAST_WEEK = randInt(5) + 1


function DetailsScreen({ navigation }) {
  const [thisWeek, setThisWeek] = useState([])
  const [lastWeek, setLastWeek] = useState([])

  useEffect(() => {
    console.log("call useeffect")
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

    setThisWeek(l1)
    setLastWeek(l2)
  }, [])

  const renderItem = ({item}) => {
    console.log(item)
    const amount = (item.isSender ? '+ ' : '- ') + item.amount.toFixed(2).toString() + " xDai"

    return (
      <View style={styles.row}>
        <Text style={{flex: 1, flexDirection: 'row', margin: 'auto', width: 100, height: '100%'}}>Place holder text</Text>
        
        <View style={{
          flex: 5,
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}>
          <View style={{flex: 5, flexDirection: 'row', margin: 'auto', height: '100%'}}>
      <Text style={styles.userName}>{item.userId}<br></br>{"ddd"}</Text>
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

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(217,217,217,1.0)',
  },
  row: {
    flex: 1,
    flexDirection: "row", // main axis
    justifyContent: "flex-start", // main axis
    alignItems: "center", // cross axis
    height: 80
  },
  userName: {
    flex: 1,
    padding: 10,
    fontSize: 14
  },
  amount: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(217,217,217,1.0)',
  },
})