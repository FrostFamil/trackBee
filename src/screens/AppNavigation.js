import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HistoryMap from "./HistoryMap";
import LiveMap from "./LiveMap";
import Prediction from './Prediction';

const Navigator = createBottomTabNavigator({
  historyMap: { screen: HistoryMap },
  liveMap: { screen: LiveMap },
  prediction: { screen: Prediction }
},{
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions:{
    labelStyle: {top:10, fontSize: 12}
  }
});

const AppContainer = createAppContainer(Navigator);

class AppNavigation extends Component {
  render() {
    return <AppContainer screenProps={this.props} />;
  }
}

export default AppNavigation;
