import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements';
import firebase from '@firebase/app';
import '@firebase/auth';
import { Spinner } from '../../components/common';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';

export default class CarrierOrdersScreen extends React.Component {
  static navigationOptions = {
    title: 'Received Orders'
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      receivedOrdersArray: null
    };
  }

  acceptOrder = async orderId => {
    const { navigation } = this.props;
    const userId = firebase.auth().currentUser.uid;
    try {
      await axios.put('https://utmeats.herokuapp.com/order/acceptOrder', {
        carrierId: userId,
        orderId: orderId
      });
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'CarrierDeliveryProcess',
            params: {
              orderId: orderId
            }
          })
        ]
      });
      navigation.dispatch(resetAction);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  componentWillMount() {
    this.didFocusListener = this.props.navigation.addListener('didFocus', () => {
      this.fetchReceivedOrders();
    });
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  _renderitem = ({ item }) => {
    const costs = item.costs;
    const foodTotal = costs.food + costs.foodTax;
    const deliveryTotal = costs.delivery + costs.deliveryTax;
    return (
      <View styes={styles.container}>
        <Text>Restaurant Name: {item.restaurantName}</Text>
        <Text>Delivery Location: {item.deliveryLocation}</Text>
        <Text>Food Cost (includes food tax): ${foodTotal.toFixed(2)}</Text>
        <Text>Delivery Pay (includes delivery tax and tips): ${deliveryTotal.toFixed(2)}</Text>
        <Text>Tip Amount: ${costs.tip.toFixed(2)}</Text>
        <Text>Total Order Cost: ${costs.total.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this._onPressReceivedOrdersFlatlist(item)}>
          <Text style={styles.submitButtonText}>Accept Order</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //costs as key is temporary as some orders in backend don't have an orderId right now
  _keyExtractor = (item, index) => (item.orderId ? item.orderId : item.costs.total.toString());

  _onPressReceivedOrdersFlatlist = item => {
    this.acceptOrder(item.orderId);
  };

  fetchReceivedOrders = async () => {
    try {
      this.setState({ loading: true });
      const rawReceivedOrders = await axios.get(
        'https://utmeats.herokuapp.com/order/getAllReceivedOrders'
      );
      this.setState({ receivedOrdersArray: rawReceivedOrders.data.receivedOrders, loading: false });
    } catch (err) {
      console.log(err);
      return;
    }
  };

  render() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Button
          title="Past Earnings"
          type="outline"
          onPress={() => this.props.navigation.navigate('Earnings')}
        />

        {this.state.receivedOrdersArray.length == 0 && <Text h4>No current orders available.</Text>}

        {this.state.receivedOrdersArray.length != 0 && (
          <View>
            <FlatList
              contentContainerStyle={styles.flatlist}
              data={this.state.receivedOrdersArray}
              renderItem={this._renderitem}
              keyExtractor={this._keyExtractor}
              onRefresh={() => this.fetchReceivedOrders()}
              refreshing={this.state.loading}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 23
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: 'white'
  },
  flatlist: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
});
