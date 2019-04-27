import React from 'react';
import { Text } from 'react-native';

import { createStackNavigator } from 'react-navigation';
import DashboardBottomTabNavigator from './DashboardBottomTabNavigator';

export default createStackNavigator(
  {
    DashboardTabNavigator: DashboardBottomTabNavigator
  },
  {
    // defaultNavigationOptions: ({ navigation }) => {
    //   return {
    //     headerLeft: <Text onPress={() => navigation.openDrawer()}>Menu</Text>
    //   };
    // }
  }
);
