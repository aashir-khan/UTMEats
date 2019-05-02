import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import axios from "axios";
import Communications from "react-native-communications";

import theme from "../../theme/Theme";

export default class CarrierCompletedDeliveryScreen extends Component {
  deliveredFood = async () => {
    const { orderId, updateDeliveryProcessStatus } = this.props;

    try {
      await axios.put("https://utmeats.herokuapp.com/order/updateOrderStatus", {
        orderId: orderId,
        newStatus: "completed"
      });
      Alert.alert("Completed Delivery!");
      updateDeliveryProcessStatus("completed");
    } catch (err) {
      console.log(err);
      return;
    }
  };

  render() {
    const { customerDetails, orderDetails } = this.props;
    const customerName = `${customerDetails.firstName} ${
      customerDetails.lastName
    }`;

    return (
      <ThemeProvider theme={theme}>
        <View style={theme.container}>
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
          <Text>Delivery Location: "{orderDetails.deliveryLocation}"</Text>
          <Text>
            Delivery Instructions: "{orderDetails.deliveryInstructions}" -
            {customerName}
          </Text>

          <Button
            title="Delivered Food"
            onPress={this.deliveredFood}
            buttonStyle={{ backgroundColor: "#27ae60" }}
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
