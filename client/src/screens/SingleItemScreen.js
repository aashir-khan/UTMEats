import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import SingleItemList from "../components/SingleItemList";
import Counter from "../components/Counter";

import { connect } from "react-redux";
import {

  initializeItem,
  setQuantity,
  addItemToCart
} from "../actions";

export class SingleItemScreen extends React.Component {
  handleAddToCartClick = () => {
    console.log("current order->", this.props.currentOrder);

    this.props.addItemToCart(this.props.currentOrder); // add order to cart

    //todo finish the screen (ie take user back to menu)

    console.log("Cart-> ", this.props.cart);

    // Alert.alert("Added item to cart.");

    //need to go back to for redux to create a new item
    this.props.navigation.goBack() ; 
  };

  render() {
    const itemSelected = this.props.navigation.getParam("itemSelected", {});

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{itemSelected.itemName}</Text>
        <SingleItemList
          navigation={this.props.navigation}
          itemSelected={itemSelected}
        />
        <Counter
          initialValue={this.props.currentOrder.quantity}
          onClick={val => this.props.setQuantity(val)} //store quantity when user clicks
        />
        <Button title="Add to Cart" onPress={this.handleAddToCartClick} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sectionHeader: {
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  return {
    currentOrder: state.currentOrder,
    cart: state.cart
  };
}

export default connect(
  mapStateToProps,
  {  initializeItem, setQuantity, addItemToCart }
)(SingleItemScreen);
