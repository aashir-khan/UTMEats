import { createStackNavigator } from 'react-navigation';

import RestaurantListScreen from '../screens/RestaurantListScreen';
import MenuScreen from '../screens/MenuScreen';
import SingleItemScreen from '../screens/SingleItemScreen';

import CartScreen from '../screens/CartScreen';

export default createStackNavigator(
  {
    RestaurantList: {
      screen: RestaurantListScreen
    },
    Menu: { screen: MenuScreen },
    SingleItem: { screen: SingleItemScreen },
    Cart: CartScreen

    // PlaceOrder: PlaceOrderScreen,
    // DeliveryProgress:  DeliveryProgressScreen
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
