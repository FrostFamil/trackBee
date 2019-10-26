import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, Button } from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import Icon from '@expo/vector-icons/FontAwesome';
import * as firebase from 'firebase';

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
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });

    this.getAnimalLocations();
 }

 getAnimalLocations = () => {
   fetch('https://trackbee-4758f.firebaseio.com/animals.json')
   .then(res => res.json())
   .then(parsedRes => {
       const placesArray = [];
       const birdsArray = [];
       const beeArray = [];
       const deerArray = [];
       for (const key in parsedRes) {
         placesArray.push({
             latitude: parsedRes[key].latitude,
             longitude: parsedRes[key].longitude,
             type: parsedRes[key].type,
             id: key
           });

           if(parsedRes[key].type === "Bird"){
             birdsArray.push({
               latitude: parsedRes[key].latitude,
               longitude: parsedRes[key].longitude,
               type: parsedRes[key].type,
               id: key
             });
           }else if(parsedRes[key].type === "Bee"){
             beeArray.push({
               latitude: parsedRes[key].latitude,
               longitude: parsedRes[key].longitude,
               type: parsedRes[key].type,
               id: key
             });
           }else if(parsedRes[key].type === "Deer"){
             deerArray.push({
               latitude: parsedRes[key].latitude,
               longitude: parsedRes[key].longitude,
               type: parsedRes[key].type,
               id: key
             });
           }
       }
     this.setState({
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
                  <Marker style={styles.marker} coordinate={{latitude: data.latitude, longitude: data.longitude}}>
                    {this.checkAnimalType(data.type)}
                  </Marker>

                  <Polygon coordinates={this.state.birdsArray} fillColor="rgba(255,0,0, 0.2)"/>
                  <Polygon coordinates={this.state.beeArray} fillColor="rgba(255,215,0, 0.2)"/>
                  <Polygon coordinates={this.state.deerArray} fillColor="rgba(205,133,63, 0.2)"/>

                </View>
              );
            }):null
        }
        </MapView>

        <View style={{ flexDirection: 'row'}}>
          <View style={{ backgroundColor: '#ffbf00', flex: 1}}>
            <Button title="Yellow" color = 'white'/>
          </View>

          <View style={{ backgroundColor: 'red', flex: 1}}>
            <Button title="Red" color = 'white'/>
          </View>

          <View style={{ backgroundColor: 'rgba(205,133,63, 1)', flex: 1}}>
            <Button title="Brown" color = 'white'/>
          </View>
        </View>
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
