import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import { CardSection } from "../common";
import axios from "axios";

import Order from "../Order";
import OrderMenuItem from "../OrderMenuItem";
import Communications from "react-native-communications";

import theme from "../../theme/Theme";

export default class CarrierAtRestaurantComponent extends Component {
  pickedUpFood = async () => {
    const { orderId, updateDeliveryProcessStatus } = this.props;

    try {
      await axios.put("https://utmeats.herokuapp.com/order/updateOrderStatus", {
        orderId: orderId,
        newStatus: "picked up food"
      });
      updateDeliveryProcessStatus("picked up food");
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
      <ThemeProvider theme={theme}>
        <View style={theme.container}>
          <ScrollView>
            <View>
              <Text style={styles.heading}>{restaurantDetails.name}</Text>
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
            </View>

            <Order
              itemsOrdered={orderDetails.items}
              costDetails={costDetails}
            />

            <Button
              title="Picked Up Food"
              onPress={this.pickedUpFood}
              buttonStyle={{ backgroundColor: "#27ae60" }}
            />
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },

  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left"
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
