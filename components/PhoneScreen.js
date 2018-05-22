import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';


export default class PhoneScreen extends React.Component {
  constructor() {
    super();
    this.title = "SMS Verification";
    this.state = {
      phone: '',
      visibleCodeInput: false,
      smsCode: '',
      confirmationResult : ''
    };
  }


  linkPhone = () => 
  {
    console.log(firebase.auth.currentUser);
    if(this.state.confirmationResult == '')
    {
      firebase.auth().signInWithPhoneNumber(this.state.phone)
      .then((res)=>
      {
        console.log(res);
        this.state.visibleCodeInput = true;
        this.state.confirmationResult = res;
      })
      .catch((error) =>
      {
        console.log(error);
      });
    }else
    {
      this.verification();
    }
  }

  verification = () => 
  {
    let credential = {
      provider: 'phone',
      token: this.state.confirmationResult._verificationId,
      secret: this.state.smsCode
   };

    firebase.auth().currentUser.linkWithCredential(credential)
        .then((res)=>
      {
        console.log(res);
      })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.welcome}>
          Valida tu teléfono
        </Text>
        <View style={styles.modules}>
        <FormLabel>Teléfono</FormLabel>
        <FormInput placeholder="Escribe tu correo"
           keyboardType='phone-pad'
           value={this.state.phone}
           onChangeText={(phone) => this.setState({ phone })}
           />
        <FormInput placeholder="Escribe tu sms code"
        keyboardType='phone-pad'
        value={this.state.smsCode}
        visible={this.state.visibleCodeInput}
        onChangeText={(smsCode) => this.setState({ smsCode })}
        />
        <Button
            style={styles.button}
            onPress={() => this.linkPhone()}
            title='Validar' />
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
