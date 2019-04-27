import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import {
  Header,
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from '../components/common';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Main'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <CardSection>
          <Button onPress={() => navigate('Payment')}>Payments</Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={() => {
              firebase.auth().signOut();
              navigate('Login');
            }}>
            Log Out
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => navigate('RestaurantList')}>
            Restaurants
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => navigate('ShoppingCart')}>
            Shopping Cart
          </Button>
        </CardSection>
      </View>
    );
  }
}
