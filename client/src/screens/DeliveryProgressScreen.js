import React, {Component} from 'react';
import { View } from 'react-native';
import { Button, CardSection } from '../components/common';

export default class DeliveryProgressScreen extends React.Component {
    static navigationOptions = {
      title: 'Delivery Progress',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <CardSection>
          <Button onPress={() => navigate('RestaurantList')}>
            Place another order
          </Button>
        </CardSection>
      );
    }
}

const styles = {
  ContainerStyle: {
    flex: 1,
  }
};  
