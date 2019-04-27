import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CardSection } from '../common';
import axios from 'axios';

import Order from '../Order';
import OrderMenuItem from '../OrderMenuItem';
import Communications from 'react-native-communications';

export default class CarrierAtRestaurantComponent extends Component {
  pickedUpFood = async () => {
    const { orderId, updateDeliveryProcessStatus } = this.props;

    try {
      await axios.put('https://utmeats.herokuapp.com/order/updateOrderStatus', {
        orderId: orderId,
        newStatus: 'picked up food'
      });
      updateDeliveryProcessStatus('picked up food');
    } catch (err) {
      console.log(err);
      return;
    }
  };

  _renderOrderMenuItemsFlatlist = itemDetails => {
    return <OrderMenuItem menuItem={itemDetails.item} />;
  };

  render() {
    const { restaurantDetails, customerDetails, orderDetails } = this.props;
    const costDetails = orderDetails.costs;

    return (
      <View style={styles.container}>
        <ScrollView>
          <CardSection>
            <View>
              <Text style={styles.heading}>{restaurantDetails.name}</Text>
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
            </View>
          </CardSection>

          <Order itemsOrdered={orderDetails.items} costDetails={costDetails} />

          <TouchableOpacity style={styles.submitButton} onPress={this.pickedUpFood}>
            <Text style={styles.submitButtonText}>Picked Up Food</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
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
