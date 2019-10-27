import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, Button, Modal } from 'react-native';
import MapView, {Marker, Polygon, Circle} from 'react-native-maps';
import Icon from '@expo/vector-icons/FontAwesome';
import {Card} from 'react-native-elements';
import * as firebase from 'firebase';

let animalsRef;
let firebaseApp;


let maxLatB, minLatB, maxLngB, minLngB;
var birdsLat = [];
var birdsLng = [];


let maxLatD, minLatD, maxLngD, minLngD;
var deersLat = [];
var deersLng = [];


let maxLatBe, minLatBe, maxLngBe, minLngBe;
var beesLat = [];
var beesLng = [];

class HistoryMap extends Component {

  static navigationOptions = {
    title: 'History Map',
    tabBarIcon: ({ tintColor }) => {
     return <Image source={require('../../assets/Icons/map.png')} style={{top: 6, width: 40, height: 40 }} />
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
      latitudeDelta: 0.13,
      longitudeDelta: 0.07
    },
    redModalShow: false,
    yellowModalShow: false,
    brownModalShow: false
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
    firebaseApp = firebase.initializeApp(firebaseConfig);

    let placesArray = [];
    let birdsArray = [];
    let beeArray = [];
    let deerArray = [];

    animalsRef = firebase.database().ref('animalsHistory/');
    animalsRef.on('value', function(item) {
      let parsedRes = Object.values(item.val());

      for (const key in parsedRes) {
        placesArray.push({
            latitude: parseFloat(parsedRes[key].latitude),
            longitude: parseFloat(parsedRes[key].longitude),
            type: parsedRes[key].type,
            id: key
          });

          if(parsedRes[key].type === "Bird"){

            birdsLat.push(parseFloat(parsedRes[key].latitude));
            birdsLng.push(parseFloat(parsedRes[key].longitude));
            maxLatB = Math.max(...birdsLat);
            minLatB = Math.min(...birdsLat);
            maxLngB = Math.max(...birdsLng);
            minLngB = Math.max(...birdsLng);

            birdsArray.push({
              latitude: parseFloat(parsedRes[key].latitude),
              longitude: parseFloat(parsedRes[key].longitude),
              type: parsedRes[key].type,
              id: key
            });
          }else if(parsedRes[key].type === "Bee"){

            beesLat.push(parseFloat(parsedRes[key].latitude));
            beesLng.push(parseFloat(parsedRes[key].longitude));
            maxLatBe = Math.max(...beesLat);
            minLatBe = Math.min(...beesLat);
            maxLngBe = Math.max(...beesLng);
            minLngBe = Math.max(...beesLng);

            beeArray.push({
              latitude: parseFloat(parsedRes[key].latitude),
              longitude: parseFloat(parsedRes[key].longitude),
              type: parsedRes[key].type,
              id: key
            });
          }else if(parsedRes[key].type === "Deer"){

            deersLat.push(parseFloat(parsedRes[key].latitude));
            deersLng.push(parseFloat(parsedRes[key].longitude));
            maxLatD = Math.max(...deersLat);
            minLatD = Math.min(...deersLat);
            maxLngD = Math.max(...deersLng);
            minLngD = Math.max(...deersLng);

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

 checkAnimalType = (type) => {

   if(type === 'Bird') {
     return (<Image source={require('../../assets/Animals/Bird.png')} style={{width: 32, height: 32 }} />);
   }else if(type === 'Bee'){
     return (<Image source={require('../../assets/Animals/bee.png')} style={{width: 32, height: 32 }} />);
   }else if(type === 'Deer'){
     return (<Image source={require('../../assets/Animals/deer.png')} style={{width: 32, height: 32 }} />);
   }

   return (<Icon name="map-pin" size={20} color="#000" />);
 }

 getBiggerNumber = (a, b) => {

   if( a > b){
     return a;
   }else{
     return b;
   }
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
            this.state.userPlaces[0] ? this.state.userPlaces.map((data) => {
              return(
                <View key={data.id.toString()}>
                  <Marker style={styles.marker} coordinate={{latitude: data.latitude, longitude: data.longitude}} key={data.id.toString()}>
                    {this.checkAnimalType(data.type)}
                  </Marker>

                  <Circle center={{latitude: (maxLatB + minLatB)/2, longitude: (maxLngB + minLngB)/2}} radius={this.getBiggerNumber((maxLatB + minLatB)/2, (maxLngB + minLngB)/2)*40} fillColor="rgba(255,0,0, 0.2)"/>
                  <Circle center={{latitude: (maxLatBe + minLatBe)/2, longitude: (maxLngBe + minLngBe)/2}} radius={this.getBiggerNumber((maxLatBe + minLatBe)/2, (maxLngBe + minLngBe)/2)*50} fillColor="rgba(255,215,0, 0.2)"/>
                  <Circle center={{latitude: (maxLatD + minLatD)/2, longitude: (maxLngD + minLngD)/2}} radius={this.getBiggerNumber((maxLatD + minLatD)/2, (maxLngD + minLngD)/2)*55} fillColor="rgba(205,133,63, 0.2)"/>

                </View>
              );
            }):null
        }
        </MapView>

        <View style={{ flexDirection: 'row'}}>
          <View style={{ backgroundColor: '#ffbf00', flex: 1}}>
            <Button title="Yellow" color = 'white' onPress={()=>this.setState({yellowModalShow: true})}/>
          </View>

          <View style={{ backgroundColor: 'red', flex: 1}}>
            <Button title="Red" color = 'white' onPress={()=>this.setState({ redModalShow: true })}/>
          </View>

          <View style={{ backgroundColor: 'rgba(205,133,63, 1)', flex: 1}}>
            <Button title="Brown" color = 'white' onPress={() => this.setState({ brownModalShow: true })}/>
          </View>
        </View>


        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.redModalShow}
            >
           {
             this.state.redModalShow?
               <View style={{ alignItems: 'center', top: 150 }}>
                 <Card
                    title='RED AREA'
                    image={require('../../assets/Pictures/Red.jpg')}
                    containerStyle={{ backgroundColor: 'red'}}>
                    <Text style={{marginBottom: 10, fontSize: 15}}>
                     Buildings and Skyscrapers are not recommended to be built around here.
                    </Text>
                    <Button
                     onPress={() => this.setState({ redModalShow: false })}
                     title='CLOSE' />
                  </Card>
               </View>
             :null
           }
          </Modal>

          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.yellowModalShow}
              >
             {
               this.state.yellowModalShow?
                 <View style={{ alignItems: 'center', top: 150 }}>
                   <Card
                      title='YELLOW AREA'
                      image={require('../../assets/Pictures/Yellow.jpg')}
                      containerStyle={{ backgroundColor: '#ffbf00'}}>
                      <Text style={{marginBottom: 10, fontSize: 15}}>
                       Try to build Radio Towers or any other buildings that send radio waves as far as possible from this area.
                      </Text>
                      <Button
                       onPress={() => this.setState({ yellowModalShow: false })}
                       title='CLOSE' />
                    </Card>
                 </View>
               :null
             }
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.brownModalShow}
                >
               {
                 this.state.brownModalShow?
                   <View style={{ alignItems: 'center', top: 150 }}>
                     <Card
                        title='YELLOW AREA'
                        image={require('../../assets/Pictures/Brown.jpg')}
                        containerStyle={{ backgroundColor: 'rgba(205,133,63, 1)'}}>
                        <Text style={{marginBottom: 10, fontSize: 15}}>
                         Drivers should slow down in order to avoid any accidents with deers crossing the road.
                        </Text>
                        <Button
                         onPress={() => this.setState({ brownModalShow: false })}
                         title='CLOSE' />
                      </Card>
                   </View>
                 :null
               }
              </Modal>
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

export default HistoryMap;
