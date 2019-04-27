import { createStackNavigator } from 'react-navigation';

import OrdersScreen from '../screens/OrdersScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import RateScreen from '../screens/RateScreen';

export default createStackNavigator(
  {
    Orders: {
      screen: OrdersScreen
    },

    OrderStatus: OrderStatusScreen,

    Rate: RateScreen
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
