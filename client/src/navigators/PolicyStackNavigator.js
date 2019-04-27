import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';

export default createStackNavigator(
  {
    Policy: {
      screen: PrivacyPolicyScreen,
     
      
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const styles = {
  icon: {
    paddingLeft: 10
  }
};
