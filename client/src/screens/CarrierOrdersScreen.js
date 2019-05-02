import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "@firebase/app";
import "@firebase/auth";
import axios from "axios";

import PastEarnings from "./PastEarnings";

export default class CarrierOrdersScreen extends React.Component {
  static navigationOptions = {
    title: "Delivery"
  };

  acceptOrder = async () => {
    const { navigation } = this.props;
    const orderId = "cMxjX7eTIfI8LTCNTNzA";
    const userId = firebase.auth().currentUser.uid;
    try {
      await axios.put("https://utmeats.herokuapp.com/order/acceptOrder", {
        carrierId: userId,
        orderId: orderId
      });
      const orderResponse = await axios.get(
        "https://utmeats.herokuapp.com/order/getOrder?orderId=" + orderId
      );
      const orderDetails = orderResponse.data;
      const restaurantResponse = await axios.get(
        "https://utmeats.herokuapp.com/restaurants/getOneRestaurant?restaurantId=" +
          orderDetails.restaurantId
      );
      const restaurantDetails = restaurantResponse.data;

      const customerDetailsResponse = await axios.get(
        "https://utmeats.herokuapp.com/user/getUser?userId=" +
          orderDetails.customerId
      );
      const customerDetails = customerDetailsResponse.data;

      navigation.navigate("CarrierNavigateRestaurant", {
        orderId: orderId,
        orderDetails: orderDetails,
        restaurantDetails: restaurantDetails,
        customerDetails: customerDetails
      });
    } catch (err) {
      console.log(err);
      return;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.acceptOrder}
        >
          <Text style={styles.submitButtonText}>Accept Order</Text>
        </TouchableOpacity>

        <PastEarnings />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  submitButton: {
    backgroundColor: "black",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});
