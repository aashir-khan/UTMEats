import React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';

import RestaurantsStackNavigator from './RestaurantsStackNavigator';
import DeliveryStackNavigator from './DeliveryStackNavigator';
import OrdersStackNavigator from './OrdersStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import CartScreen from '../screens/CartScreen';
import theme from '../theme/Theme';

export default createBottomTabNavigator(
  {
    MainMenu: {
      screen: RestaurantsStackNavigator,
      navigationOptions: {
        title: 'Home',
        tabBarLabel: 'Food',
        tabBarIcon: ({ tintColor }) => <Icon name="md-pizza" color={tintColor} type="ionicon" />,
        tabBarOptions: theme.TabBarOptions
      }
    },
    Orders: {
      screen: OrdersStackNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Orders',
          tabBarLabel: 'Orders',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="md-document" color={tintColor} type="ionicon" />
          ),
          tabBarOptions: theme.TabBarOptions
        };
      }
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        title: 'Shopping Cart',
        tabBarLabel: 'Cart',
        tabBarIcon: ({ tintColor }) => <Icon name="md-cart" color={tintColor} type="ionicon" />,
        tabBarOptions: theme.TabBarOptions
      }
    },
    Deliver: {
      screen: DeliveryStackNavigator,
      navigationOptions: {
        title: 'Deliver',
        tabBarLabel: 'Deliver',
        tabBarIcon: ({ tintColor }) => <Icon name="md-walk" color={tintColor} type="ionicon" />,
        tabBarOptions: theme.TabBarOptions
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        title: 'Profile',
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon name="md-person" color={tintColor} type="ionicon" />,
        tabBarOptions: theme.TabBarOptions
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);
