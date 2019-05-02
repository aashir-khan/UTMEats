import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button, Icon, ThemeProvider } from "react-native-elements";

import MenuList from "../components/MenuList";

import { connect } from "react-redux";
import { initializeCart } from "../actions";
import theme from "../theme/Theme";

class MenuScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.restaurant.name}`,
      headerTitleStyle: theme.Header.headerTitleStyle,
      headerTintColor: theme.Header.headerTintColor,
      headerStyle: theme.Header.headerStyle,
      headerRight: (
        <Button
          icon={
            <Icon
              name="md-cart"
              type="ionicon"
              color={theme.Header.headerTintColor}
            />
          }
          type="clear"
          iconRight
          onPress={() => {
            const { navigate } = navigation;
            navigate("Cart", {});
          }}
        />
      )
    };
  };

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
        <MenuList
          restaurantId={restaurant.restaurantId}
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
