import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './components/LoginScreen';
import PhoneScreen from './components/PhoneScreen';
import firebase from 'react-native-firebase';


const RootStack = createStackNavigator({
  Login: LoginScreen,
  Phone: PhoneScreen
},
  {
    initialRouteName: 'Login',
  });

export default class App extends React.Component {

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return <RootStack />;
  }
}

