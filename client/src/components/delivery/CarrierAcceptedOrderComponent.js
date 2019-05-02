import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import axios from "axios";
import Communications from "react-native-communications";

import theme from "../../theme/Theme";

export default class CarrierAcceptedOrderComponent extends Component {
  arrivedRestaurant = async () => {
    const { orderId, updateDeliveryProcessStatus } = this.props;

    try {
      await axios.put("https://utmeats.herokuapp.com/order/updateOrderStatus", {
        orderId: orderId,
        newStatus: "at restaurant"
      });
      updateDeliveryProcessStatus("at restaurant");
    } catch (err) {
      console.log(err);
      return;
    }
  };

  render() {
    const { restaurantDetails, customerDetails } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <View style={theme.container}>
          <Text>Order for restaurant: {restaurantDetails.name}</Text>
          <Button
            title="Call Customer"
            buttonStyle={{ backgroundColor: "rgb(80,80,80)" }}
            onPress={() =>
              Communications.phonecall(customerDetails.phoneNumber, true)
            }
          />
          <Button
            title="Text Customer"
            buttonStyle={{ backgroundColor: "rgb(80,80,80)" }}
            onPress={() => Communications.text(customerDetails.phoneNumber)}
          />
          <Button
            buttonStyle={{ backgroundColor: "#27ae60" }}
            onPress={this.arrivedRestaurant}
            title="Arrived At Restaurant"
          />
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});
