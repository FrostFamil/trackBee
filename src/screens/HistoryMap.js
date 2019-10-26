import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
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
       for (const key in parsedRes) {
         placesArray.push({
             latitude: parsedRes[key].latitude,
             longitude: parsedRes[key].longitude,
             id: key
           });
       }
     this.setState({
        userPlaces: placesArray
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
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
        >
        {
            this.state.userPlaces[0] ? this.state.userPlaces.map((data) => {
              return(
                <Marker style={styles.marker} coordinate={{latitude: data.latitude, longitude: data.longitude}} key={data.id.toString()}>
                  <Image source={require('../../assets/Animals/bee.png')} style={{width: 32, height: 32 }} />
                </Marker>
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

export default HistoryMap;
