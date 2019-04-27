import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import AppSwitchNavigator from './navigators/AppSwitchNavigator';

import { useScreens } from 'react-native-screens';
useScreens();

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
