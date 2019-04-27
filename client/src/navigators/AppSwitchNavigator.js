import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AuthStackNavigator from './AuthStackNavigator';
// import AppDrawerNavigator from './AppDrawerNavigator';
import DashboardStackNavigator from './DashboardStackNavigator';

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,

    Auth: AuthStackNavigator,
    Dashboard: {
      screen: DashboardStackNavigator
    }
  },
  { initialRouteName: 'AuthLoading' }
);
