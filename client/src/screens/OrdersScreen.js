import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomerOrdersList from '../components/CustomerOrdersList';

export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    title: 'Orders',
  };

  render() {

    return (
      <View style={styles.container}>
        <CustomerOrdersList navigation={this.props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
