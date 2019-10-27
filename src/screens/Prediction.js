import React, {Component} from 'react';
import { View, Text, ActivityIndicator, Image, Button } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Icon from '@expo/vector-icons/FontAwesome';
import {Card} from 'react-native-elements';
import * as firebase from 'firebase';


const YearArray2 = [
{ id: 1, latitude: 37.07981014865236 , longitude: -120.98040338679051},
{ id: 2, latitude: 37.08240063909219 , longitude: -120.97411880522702},
{ id: 3, latitude: 37.08829048922991 , longitude: -120.96950028164234},
{ id: 4, latitude: 37.09015165700949 , longitude: -120.96621433807259},
{ id: 5, latitude: 37.097127897992245 , longitude: -120.96400422265637},
{ id: 6, latitude: 37.10176896768927 , longitude: -120.95776460873864},
{ id: 7, latitude: 37.10793397269723 , longitude: -120.95332653654114},
{ id: 8, latitude: 37.11479927110029 , longitude: -120.94638736679019},
{ id: 9, latitude: 37.11608715355378 , longitude: -120.93943899929857},
{ id: 10, latitude: 37.120732137950746 , longitude: -120.93674040793222},
{ id: 11, latitude: 37.127165813197855 , longitude: -120.93488203379204},
{ id: 12, latitude: 37.132036340073014 , longitude: -120.93218015131725},
{ id: 13, latitude: 37.13623950620894 , longitude: -120.92683120905633},
{ id: 14, latitude: 37.14130750968539 , longitude: -120.92084106406104},
{ id: 15, latitude: 37.14491393537079 , longitude: -120.91902321207368},
{ id: 16, latitude: 37.1494584500655 , longitude: -120.91636802732498},
{ id: 17, latitude: 37.15397435767017 , longitude: -120.91424215933176},
{ id: 18, latitude: 37.157843049710166 , longitude: -120.9083197530313},
{ id: 19, latitude: 37.161987330209925 , longitude: -120.90693575270491},
{ id: 20, latitude: 37.163755764683124 , longitude: -120.90029567753606},
];


const YearArray3 = [
{ id: 1, latitude: 37.08418805961864 , longitude: -120.97473288481712},
{ id: 2, latitude: 37.091836235328586 , longitude: -120.96716065345953},
{ id: 3, latitude: 37.09905591627297 , longitude: -120.95853736981515},
{ id: 4, latitude: 37.10693973402031 , longitude: -120.95042907890259},
{ id: 5, latitude: 37.113259553919484 , longitude: -120.94334150678806},
{ id: 6, latitude: 37.12107411746508 , longitude: -120.93651586662935},
{ id: 7, latitude: 37.12897964674401 , longitude: -120.93120746916478},
{ id: 8, latitude: 37.135964002674925 , longitude: -120.92267808128194},
{ id: 9, latitude: 37.14376263140402 , longitude: -120.9173345605081},
{ id: 10, latitude: 37.150556993058295 , longitude: -120.9121086208599},
{ id: 11, latitude: 37.15870651332864 , longitude: -120.90520887160183},
{ id: 12, latitude: 37.166923974981216 , longitude: -120.89966045147249},
{ id: 13, latitude: 37.17216425550771 , longitude: -120.89216485711083},
{ id: 14, latitude: 37.18041201949904 , longitude: -120.88329089590606},
{ id: 15, latitude: 37.18601723203317 , longitude: -120.87444156334031},
{ id: 16, latitude: 37.191198874134535 , longitude: -120.86662884992053},
{ id: 17, latitude: 37.19736468467108 , longitude: -120.86000090661396},
{ id: 18, latitude: 37.204384075657075 , longitude: -120.85354524198065},
{ id: 19, latitude: 37.210188449648136 , longitude: -120.84604805445416},
{ id: 20, latitude: 37.21864954749443 , longitude: -120.83951189846805},
];

const YearArray10 = [
{ id: 1,  latitude: 37.082517930569814 , longitude: -120.97831078528779},
{ id: 2, latitude: 37.09194958399503 , longitude: -120.97355600320265},
{ id: 3, latitude: 37.093072881126616 , longitude: -120.96469656249337},
{ id: 4, latitude: 37.09913944685509 , longitude: -120.96018773343405},
{ id: 5, latitude: 37.10209614601618 , longitude: -120.95045016158099},
{ id: 6, latitude: 37.10996859110468 , longitude: -120.94232173694618},
{ id: 7, latitude: 37.11427914647238 , longitude: -120.93923478403121},
{ id: 8, latitude: 37.12212128639159 , longitude: -120.9366762590066},
{ id: 9, latitude: 37.12622502915195 , longitude: -120.92885315497774},
{ id: 10, latitude: 37.134995596921016 , longitude: -120.92481012666023},
{ id: 11, latitude: 37.139080083401026 , longitude: -120.9214648947201},
{ id: 12, latitude: 37.14230338907505 , longitude: -120.91817034778985},
{ id: 13, latitude: 37.15123132129224 , longitude: -120.91434583244374},
{ id: 14, latitude: 37.15246773891597 , longitude: -120.91274397338708},
{ id: 15, latitude: 37.16220473273745 , longitude: -120.90968392056747},
{ id: 16, latitude: 37.16929699715051 , longitude: -120.90394091212411},
{ id: 17, latitude: 37.17782099881742 , longitude: -120.89917558633653},
{ id: 18, latitude: 37.17975044242254 , longitude: -120.89512701674542},
{ id: 19, latitude: 37.185961084617624 , longitude: -120.88572329817342},
{ id: 20, latitude: 37.190967107029934 , longitude: -120.87751738731151},
];

class Predictions extends Component {

  static navigationOptions = {
    title: 'Predictions',
    tabBarIcon: ({ tintColor }) => {
     return <Image source={require('../../assets/Icons/predict.png')} style={{top: 6, width: 40, height: 40 }} />
   }
  }

  state = {
    region: {
      latitude: 37.08229733,
      longitude: -120.98865509,
      latitudeDelta: 0.20,
      longitudeDelta: 0.07
    },
    show2year: false,
    show3year: false,
    show10year: false
  }

  render() {

    return(
      <View style={{ flex: 1, backgroundColor: '' }} >
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
        >
        {
          this.state.show2year ? YearArray2.map((data) => {
            return (
              <View key={data.id}>
                <Marker style={styles.marker} coordinate={{latitude: data.latitude, longitude: data.longitude}}>
                  <Image source={require('../../assets/Animals/Bird.png')} style={{width: 32, height: 32 }} />
                </Marker>

                <Polyline coordinates={YearArray2} strokeWidth={3} strokeColor={"red"} />
              </View>
            );
          }):null
        }

        {
          this.state.show3year ? YearArray3.map((data) => {
            return (
              <View key={data.id}>
                <Marker style={styles.marker} coordinate={{latitude: data.latitude, longitude: data.longitude}}>
                  <Image source={require('../../assets/Animals/Bird.png')} style={{width: 32, height: 32 }} />
                </Marker>

                <Polyline coordinates={YearArray2} strokeWidth={3} strokeColor={"red"} />
              </View>
            );
          }):null
        }

        {
          this.state.show10year ? YearArray10.map((data) => {
            return (
              <View key={data.id}>
                <Marker style={styles.marker} coordinate={{latitude: data.latitude, longitude: data.longitude}}>
                  <Image source={require('../../assets/Animals/Bird.png')} style={{width: 32, height: 32 }} />
                </Marker>

                <Polyline coordinates={YearArray2} strokeWidth={3} strokeColor={"red"} />
              </View>
            );
          }):null
        }
        </MapView>
        <View style={{ flexDirection: 'row'}}>
          <View style={{ backgroundColor: '#03cafc', flex: 1}}>
            <Button title="2 Years" color = 'white' onPress={() => this.setState({ show2year: true, show3year: false, show10year: false})}/>
          </View>

          <View style={{ backgroundColor: '#0377fc', flex: 1}}>
            <Button title="3 Years" color = 'white' onPress={() => this.setState({ show2year: false, show3year: true, show10year: false})}/>
          </View>

          <View style={{ backgroundColor: '#0331fc', flex: 1}}>
            <Button title="10 Years" color = 'white' onPress={() => this.setState({ show2year: false, show3year: false, show10year: true})}/>
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

export default Predictions;
