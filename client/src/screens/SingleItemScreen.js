import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import SingleItemList from '../components/SingleItemList';
import Counter from '../components/Counter';

import { connect } from 'react-redux';
import { initializeItem, setQuantity, addItemToCart } from '../actions';
import theme from '../theme/Theme';

export class SingleItemScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.itemSelected.itemName}`,
    headerTitleStyle: theme.Header.headerTitleStyle,
    headerTintColor: theme.Header.headerTintColor,
    headerStyle: theme.Header.headerStyle
  });

  componentDidMount() {
    //hide the button cuz user is looking at a different restaurants' menu
    if (this.props.cart.restaurantId != this.props.restaurantId) {
    }
  }

  handleAddToCartClick = () => {
    console.log('current order->', this.props.currentOrder);

    this.props.addItemToCart(this.props.currentOrder); // add order to cart

    //todo finish the screen (ie take user back to menu)

    console.log('Cart-> ', this.props.cart);

    // Alert.alert("Added item to cart.");

    //need to go back to for redux to create a new item
    this.props.navigation.goBack();
  };

  render() {
    const itemSelected = this.props.navigation.getParam('itemSelected', {});
    const restaurantId = this.props.navigation.getParam('restaurantId', 1);
    return (
      <View style={styles.container}>
        <SingleItemList navigation={this.props.navigation} itemSelected={itemSelected} />
        <Counter
          initialValue={this.props.currentOrder.quantity}
          onClick={val => this.props.setQuantity(val)} //store quantity when user clicks
        />
        <Button
          disabled={this.props.cart.restaurantId != restaurantId}
          title="Add to Cart"
          onPress={this.handleAddToCartClick}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sectionHeader: {
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center'
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
  { initializeItem, setQuantity, addItemToCart }
)(SingleItemScreen);
