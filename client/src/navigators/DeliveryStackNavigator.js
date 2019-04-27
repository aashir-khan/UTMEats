import { createStackNavigator } from 'react-navigation';

import CarrierOrdersScreen from '../screens/delivery/CarrierOrdersScreen';
import CarrierDeliveryProcessScreen from '../screens/delivery/CarrierDeliveryProcessScreen';
import PastEarnings from '../screens/PastEarnings';

export default createStackNavigator(
  {
    Deliver: {
      screen: CarrierOrdersScreen
    },
    CarrierDeliveryProcess: {
      screen: CarrierDeliveryProcessScreen
    },
    Earnings: {
      screen: PastEarnings
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
