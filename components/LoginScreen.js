import React from 'react';
import { StyleSheet, Platform, Modal, ActivityIndicator, Image, Text, View, ScrollView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.title = "Login";
    this.state = {
      email: '',
      password: '',
      modalVisible: false
    };

    GoogleSignin.configure()
    .then(() => {
      console.log('google sign in configured');
    });
  }

  handleSuccessAuth= ()=>
  {
    this.modalVisible = false;
    this.props.navigation.navigate('Phone')
    console.log(firebase.auth().currentUser);
  }
  
  onRegister = () => {
    this.props.navigation.navigate('Scanner')
    // this.modalVisible = true;
    // const { email, password } = this.state;
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     console.log(user);
    //     this.handleSuccessAuth();
    //   })
    //   .catch((error) => {
    //     const { code, message } = error;
        
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then((user) => {
    //       this.handleSuccessAuth();
    //     })
    //     .catch((error) => {
    //       const { code, message } = error;
    //       console.log(error)
    //     });
    //   });
  }

  onLoginOrRegister = () => {
    GoogleSignin.signIn()
      .then((data) => {
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        return firebase.auth().signInAndRetrieveDataWithCredential(credential);
      })
      .then((user) => {
        this.handleSuccessAuth();
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(error);
      });
  }
  

  render() {
    return (
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={false}
          style={styles.modal}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('modal closed.');
          }}
          >
          <ActivityIndicator size="large" color="#0000ff" />
          </Modal>
        <View style={styles.container}>
        <Image source={require('../assets/logo.png')} resizeMode="cover" style={[styles.logo]} />
        <Text style={styles.welcome}>
          Dumbledore{'\n'}Regístrate!
        </Text>
        <View style={styles.modules}>
        <FormLabel>Correo</FormLabel>
          <FormInput placeholder="Escribe tu correo"
           value={this.state.email}
           onChangeText={(email) => this.setState({ email })}
           />
        <FormLabel>Contraseña</FormLabel>
          <FormInput 
            placeholder="Escribe tu contraseña"  
            secureTextEntry={true} value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
                     />
          <Button
            style={styles.button}
            onPress={() => this.onRegister()}
            title='Iniciar' />

          <GoogleSigninButton
              style={{width: 48, height: 48}}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => this.onLoginOrRegister()}
              />
        </View>
        </View>    
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modal:
  {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:
  {
    color:"#fff",
    backgroundColor:'#0095ff'
  },
  logo: {
    marginBottom: 16,
    marginTop: 32,
    width: 180,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  modules: {
    margin: 20,
    marginBottom: 60
  }
});
