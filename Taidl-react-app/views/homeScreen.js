import React from 'react';
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
    StatusBar
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

const myBalance = '10 Xdai';
const myBalanceUSD = 'USD 10.00';

function HomeScreen({ navigation }) {
    return (
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Home Screen</Text>
    //     <Button
    //       title="Login"
    //       onPress={() => navigation.navigate('Login')}
    //     />
    //   </View>
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.imageholder}>
        </View>
        <Text style={styles.titleText}>${myBalance}</Text>
        <Text style={styles.text}>${myBalanceUSD}</Text>
        <View style={styles.buttonView}>
            <Button
                title="Top Up"
                color='white'
            />
        </View>
      </View>
      <View style={styles.buttonView2}>
        <Button
            title="Send"
            color='white'
        />
      </View>
      <View style={styles.buttonView2}>
        <Button
            title="Request"
            color='white'
        />
      </View>
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
      backgroundColor: "grey",
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
        backgroundColor: "grey",
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
        backgroundColor: '#1f65ff',
        alignSelf: 'flex-end',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        margin: 20,
        marginBottom: 0,
        marginTop: 0,
        bottom: 0
    },
    buttonView2:{
        flex: 0.09,
        backgroundColor: '#1f65ff',
        textAlign: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        margin: 20,
        marginBottom: 5,
        marginTop: 5
    },
    bottomholder:{
        flex: 0.3,
        backgroundColor: 'white',

    }
  });