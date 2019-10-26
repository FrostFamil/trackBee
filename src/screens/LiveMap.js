import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import MapView from 'react-native-maps';


class LiveMap extends Component {

  static navigationOptions = {
    title: 'Live Map',
    tabBarIcon: ({ tintColor }) => {
     return <Image source={require('../../assets/Icons/radar.png')} style={{top:6, width: 40, height: 40 }} />
   }
  }

  state = {
    mapLoaded: false,
    region: {
      latitude: 37.09746947,
      longitude: -121.0171509,
      latitudeDelta: 0.13,
      longitudeDelta: 0.07
    }
  }

  async componentDidMount() {
    this.setState({ mapLoaded: true });
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
        />
      </View>
    );
  }
}

export default LiveMap;
