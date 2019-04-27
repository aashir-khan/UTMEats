import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Communications from 'react-native-communications';

export default class CarrierCompletedDeliveryScreen extends Component {
  deliveredFood = async () => {
    const { orderId, updateDeliveryProcessStatus } = this.props;

    try {
      await axios.put('https://utmeats.herokuapp.com/order/updateOrderStatus', {
        orderId: orderId,
        newStatus: 'completed'
      });
      Alert.alert('completed delivery!');
      updateDeliveryProcessStatus('completed');
    } catch (err) {
      console.log(err);
      return;
    }
  };

  render() {
    const { customerDetails, orderDetails } = this.props;
    const customerName = `${customerDetails.firstName} ${customerDetails.lastName}`;

    return (
      <View styes={styles.container}>
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
        <Text>Delivery Location: "{orderDetails.deliveryLocation}"</Text>
        <Text>
          Delivery Instructions: "{orderDetails.deliveryInstructions}" -{customerName}
        </Text>
        <TouchableOpacity style={styles.submitButton} onPress={this.deliveredFood}>
          <Text style={styles.submitButtonText}>Delivered Food</Text>
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
