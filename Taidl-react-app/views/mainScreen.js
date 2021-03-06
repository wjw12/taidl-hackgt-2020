import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './homeScreen';
import DetailsScreen from './detailsScreen';
import TransactionScreen from './transactionScreen';
import { TITLE } from '../constants'

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#00BFA4"
      inactiveColor="#777777"
      barStyle={{ backgroundColor: '#dadada' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#00BFA4',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction Activity"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Activity',
          tabBarColor: '#00BFA4',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#00BFA4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:TITLE,
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#00BFA4" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
    </HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#00BFA4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
        title:'Recent Transactions',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#00BFA4" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
    </DetailsStack.Navigator>
);