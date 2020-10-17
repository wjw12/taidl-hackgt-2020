import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// import loginScreen from './views/login'
// import SignInScreen from './views/signup'
import LoginScreen from './views/loginScreen'
//import HomeScreen from './views/homeScreen'
import mainScreen from './views/mainScreen'

// const DEBUG = true

// // 🏠 Your local provider is usually pointed at your local blockchain
// const localProviderUrl = "http://localhost:8545"; // for xdai: https://dai.poa.network
// // as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
// const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
// if(DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
// const localProvider = new JsonRpcProvider(localProviderUrlFromEnv);


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={mainScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
