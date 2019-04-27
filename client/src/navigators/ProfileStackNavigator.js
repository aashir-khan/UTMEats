import { createStackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';

export default createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen
    },
    AccountSettings: {
      screen: AccountSettingsScreen
    },
    Policy: {
      screen: PrivacyPolicyScreen
    },
    Payment: {
      screen: PaymentScreen
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
