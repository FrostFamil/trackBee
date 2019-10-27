import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, Button, Modal } from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import Icon from '@expo/vector-icons/FontAwesome';
import {Card} from 'react-native-elements';
import * as firebase from 'firebase';


class LiveMap extends Component {

  static navigationOptions = {
    title: 'Live Map',
    tabBarIcon: ({ tintColor }) => {
     return <Image source={require('../../assets/Icons/radar.png')} style={{top: 6, width: 40, height: 40 }} />
   }
  }

  state = {
    mapLoaded: false,
    birdsArray: [],
    beeArray: [],
    deerArray: [],
    userPlaces: [],
    region: {
      latitude: 37.09746947,
      longitude: -121.0171509,
      latitudeDelta: 0.7,
      longitudeDelta: 0.07
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
    var that = this

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
     if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }

    let placesArray = [];
    let birdsArray = [];
    let beeArray = [];
    let deerArray = [];

    firebase.database().ref('animalsLive/').on('value', function(item) {
      let parsedRes = Object.values(item.val());

      for (const key in parsedRes) {
        placesArray.push({
            latitude: parseFloat(parsedRes[key].latitude),
            longitude: parseFloat(parsedRes[key].longitude),
            type: parsedRes[key].type,
            id: key
          });

          if(parsedRes[key].type === "Bird"){
            birdsArray.push({
              latitude: parseFloat(parsedRes[key].latitude),
              longitude: parseFloat(parsedRes[key].longitude),
              type: parsedRes[key].type,
              id: key
            });
          }else if(parsedRes[key].type === "Bee"){
            beeArray.push({
              latitude: parseFloat(parsedRes[key].latitude),
              longitude: parseFloat(parsedRes[key].longitude),
              type: parsedRes[key].type,
              id: key
            });
          }else if(parsedRes[key].type === "Deer"){
            deerArray.push({
              latitude: parseFloat(parsedRes[key].latitude),
              longitude: parseFloat(parsedRes[key].longitude),
              type: parsedRes[key].type,
              id: key
            });
          }
      }

      that.setState({
        userPlaces: placesArray,
        birdsArray: birdsArray,
        beeArray: beeArray,
        deerArray: deerArray
      });
    })
 }

  render() {

    if(!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return(
      <View style={{ flex: 1, backgroundColor: '' }} >
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
        >
        {
            this.state.birdsArray[0] ? this.state.birdsArray.map((data) => {
              return(
                <View key={data.id.toString()}>
                  <Marker style={styles.marker} coordinate={this.state.birdsArray[this.state.birdsArray.length-1]} key={data.id.toString()}>
                    <Image source={require('../../assets/Animals/Bird.png')} style={{width: 32, height: 32 }} />
                  </Marker>
                </View>
              );
            }):null
        }

        {
            this.state.beeArray[0] ? this.state.beeArray.map((data) => {
              return(
                <View key={data.id.toString()}>
                  <Marker style={styles.marker} coordinate={this.state.beeArray[this.state.beeArray.length-1]} key={data.id.toString()}>
                    <Image source={require('../../assets/Animals/bee.png')} style={{width: 32, height: 32 }} />
                  </Marker>
                </View>
              );
            }):null
        }

        {
            this.state.deerArray[0] ? this.state.deerArray.map((data) => {
              return(
                <View key={data.id.toString()}>
                  <Marker style={styles.marker} coordinate={this.state.deerArray[this.state.deerArray.length-1]} key={data.id.toString()}>
                    <Image source={require('../../assets/Animals/deer.png')} style={{width: 32, height: 32 }} />
                  </Marker>
                </View>
              );
            }):null
        }
        </MapView>
      </View>
    );
  }
}

const styles = {
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white'
  }
}

export default LiveMap;
