import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-community/async-storage';

import LoginScreen from './views/loginScreen'
import SignUpScreen from './views/signupScreen';
//import HomeScreen from './views/homeScreen'
import mainScreen from './views/mainScreen'

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

  const [state, dispatchMain] = React.useReducer(reducer, initialState);

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
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={mainScreen} />
          <Drawer.Screen name="Log Out" component={LoginScreen} />
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
