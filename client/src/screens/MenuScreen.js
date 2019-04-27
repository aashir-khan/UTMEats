import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MenuList from "../components/MenuList";

import { connect } from "react-redux";
import { initializeCart } from "../actions";

class MenuScreen extends React.Component {

  componentDidMount() {
    const { navigation } = this.props;

    const restaurant = navigation.getParam("restaurant", {});

    //initialize cart and set the restaurant that user is currently looking at.
    
    this.props.initializeCart(restaurant.restaurantId);
  }

  render() {
    const { navigation } = this.props;
    // entire restaurant details, including menu, hours (if applicable), etc
    const restaurant = navigation.getParam("restaurant", {});

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.heading}>{restaurant.name}</Text>
        </View>
        <MenuList
          navigation={this.props.navigation}
          categoriesAndTheirItems={restaurant.menu}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(
  mapStateToProps,
  { initializeCart }
)(MenuScreen);
