import React, {useState} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

// import { AppLoading } from "expo";
// import * as Font from "expo-font";
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';

const DrawerNavigation = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    drawerBackgroundColor: 'black',
  },
);

const AppNavigator = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation,
    },
    Home: {
      screen: Home,
    },
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#070c2e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
