import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Communications from 'react-native-communications';

export default class CarrierAcceptedOrderComponent extends Component {
  arrivedRestaurant = async () => {
    const { orderId, updateDeliveryProcessStatus } = this.props;

    try {
      await axios.put('https://utmeats.herokuapp.com/order/updateOrderStatus', {
        orderId: orderId,
        newStatus: 'at restaurant'
      });
      updateDeliveryProcessStatus('at restaurant');
    } catch (err) {
      console.log(err);
      return;
    }
  };

  render() {
    const { restaurantDetails, customerDetails } = this.props;

    return (
      <View styes={styles.container}>
        <Text>Order for restaurant: {restaurantDetails.name}</Text>
        <TouchableOpacity onPress={() => Communications.phonecall(customerDetails.phoneNumber, true)}>
          <View>
            <Text>Call Customer</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Communications.text(customerDetails.phoneNumber)}>
          <View>
            <Text>Text Customer</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={this.arrivedRestaurant}>
          <Text style={styles.submitButtonText}>Arrived Restaurant</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: 'white'
  }
});
