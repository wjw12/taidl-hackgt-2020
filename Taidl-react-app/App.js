import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-community/async-storage';

import { DrawerNavigation } from './components/drawerNavi';
import LoginScreen from './views/loginScreen'
import SignUpScreen from './views/signupScreen';
//import HomeScreen from './views/homeScreen'
import mainScreen from './views/mainScreen';
import RequestScreen from './views/requestScreen';
import RecipientScreen from './views/recipientScreen';
import QRScanScreen from './views/QRScanScreen';
import NewRecipientScreen from './views/newRecipientScreen';
import SentConfirmScreen from './views/sentConfirmScreen';


import { initialState, reducer} from './reducers/wallet'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootStackScreen = ({navigation}) => (
  <Stack.Navigator headerMode='none'>
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
  </Stack.Navigator>
);

function App() {
  const initialLoginState = {
    isLoading: false,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      console.log("sign in", userName, userToken)
      
      try {
        await AsyncStorage.setItem('userId', userName);
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      { loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props=> <DrawerNavigation {...props} />}>
          <Drawer.Screen name="Home" component={mainScreen} />
          <Drawer.Screen name="RequestScreen" component={RequestStackScreen} />
          <Drawer.Screen name="RecipientScreen" component={RecipientStackScreen} />
          <Drawer.Screen name="QRScanScreen" component={QRScanStackScreen} />
          <Drawer.Screen name="NewRecipientScreen" component={NewRecipientStackScreen} />
          <Drawer.Screen name="SentConfirmScreen" component={SentConfirmStackScreen} />
        </Drawer.Navigator>
       )
      :
        <RootStackScreen/>
      }
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
export default App;

const RequestStack = createStackNavigator();
const RequestStackScreen = ({navigation}) => (
  <RequestStack.Navigator screenOptions={{
      headerStyle: {backgroundColor: '#00BFA4'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'}
  }}>
    <RequestStack.Screen name="Home" component={RequestScreen} options={{
      title:'Wallet',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#00BFA4" onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00BFA4" onPress={() => navigation.goBack()}></Icon.Button>
      )
      }} />
  </RequestStack.Navigator>
);

const QRScanStack = createStackNavigator();
const QRScanStackScreen = ({navigation}) => (
  <QRScanStack.Navigator screenOptions={{
      headerStyle: {backgroundColor: '#00BFA4'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'}
  }}>
    <QRScanStack.Screen name="Home" component={QRScanScreen} options={{
      title:'Wallet',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#00BFA4" onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00BFA4" onPress={() => navigation.goBack()}></Icon.Button>
      )
      }} />
  </QRScanStack.Navigator>
);

const RecipientStack = createStackNavigator();
const RecipientStackScreen = ({navigation}) => (
  <RecipientStack.Navigator screenOptions={{
      headerStyle: {backgroundColor: '#00BFA4'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'}
  }}>
    <RecipientStack.Screen name="Home" component={RecipientScreen} options={{
      title:'Wallet',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#00BFA4" onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00BFA4" onPress={() => navigation.goBack()}></Icon.Button>
      )
      }} />
  </RecipientStack.Navigator>
);

const NewRecipientStack = createStackNavigator();
const NewRecipientStackScreen = ({navigation}) => (
  <NewRecipientStack.Navigator screenOptions={{
      headerStyle: {backgroundColor: '#00BFA4'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'}
  }}>
    <NewRecipientStack.Screen name="Home" component={NewRecipientScreen} options={{
      title:'Wallet',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#00BFA4" onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00BFA4" onPress={() => navigation.goBack()}></Icon.Button>
      )
      }} />
  </NewRecipientStack.Navigator>
);

const SentConfirmStack = createStackNavigator();
const SentConfirmStackScreen = ({navigation}) => (
  <SentConfirmStack.Navigator screenOptions={{
      headerStyle: {backgroundColor: '#00BFA4'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'}
  }}>
    <SentConfirmStack.Screen name="Home" component={SentConfirmScreen} options={{
      title:'Wallet',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#00BFA4" onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00BFA4" onPress={() => navigation.goBack()}></Icon.Button>
      )
      }} />
  </SentConfirmStack.Navigator>
);



