import React, {Component} from 'react';
import { View } from 'react-native';
import { Button, CardSection } from '../components/common';

export default class PlaceOrderScreen extends React.Component {
    static navigationOptions = {
      title: 'Finalize Order',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <CardSection>
          <Button onPress={() => navigate('DeliveryProgress')}>
            Place Order
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
