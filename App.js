import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './src/screens/AppNavigation';
import * as firebase from 'firebase';

console.disableYellowBox = true;

class App extends Component {

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyD5DqLGa-2rX2pMUfwoeX98agY40--AILI",
      authDomain: "trackbee-4758f.firebaseapp.com",
      databaseURL: "https://trackbee-4758f.firebaseio.com",
      projectId: "trackbee-4758f",
      storageBucket: "trackbee-4758f.appspot.com",
      messagingSenderId: "853866811590",
      appId: "1:853866811590:web:86990581757435a4cac7c7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    /*
    firebase.database().ref("animals/").push({
        latitude: 37.11159818,
        longitude: -121.01158906,
        type: "Bee"
    });*/
  }

  render(){
    return (
      <AppNavigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
