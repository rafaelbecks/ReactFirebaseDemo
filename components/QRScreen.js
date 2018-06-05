import React from 'react';
import { 
    Platform,
    Image,
    Text,
    View,
    ScrollView,
    AppRegistry,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Linking
} from 'react-native';
import { 
    FormLabel,
    FormInput,
    Button 
} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios'

export default class QRScreen extends React.Component {
  constructor() {
    super();
    this.title = "QR Scanner";
  }

  barcodeReceived(e) {

    axios.get("http://192.95.57.169/testPusher/?hash=" + e.data)
        .then(() => {
            Alert.alert(
                'Te has conectado',
                e.data,
                { cancelable: false }
            );
        })
        .catch((err) => console.log(err));

   }

    render() {
        return (
        <QRCodeScanner
            onRead={this.barcodeReceived.bind(this)}
            topContent={
            <Text style={styles.centerText}>
                Escanea código QR
            </Text>
            }
            bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>Chévere!</Text>
            </TouchableOpacity>
            }
        />
        );
    }


}


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});