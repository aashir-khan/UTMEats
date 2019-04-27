import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import CustomerOrdersListItem from './CustomerOrdersListItem';
import { Spinner } from '../components/common';
import firebase from '@firebase/app';
import '@firebase/auth';
import axios from 'axios';

export default class CustomerOrdersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOrders: [],
      completedOrders: [],
      loading: true,
      getCustomerOrdersListener: null
    };
    this.userId = firebase.auth().currentUser.uid;
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener('didFocus', () => {
      this.getCustomerOrders();
    });
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  async getCustomerOrders() {
    try {
      this.setState({ loading: true });
      const orders = await axios.get(
        'https://utmeats.herokuapp.com/order/getCustomerOrders?userId=' + this.userId
      );
      const activeOrders = orders.data.active;
      const completedOrders = orders.data.completed;

      this.setState({
        activeOrders: activeOrders,
        completedOrders: completedOrders,
        loading: false
      });
    } catch (err) {
      console.log(err);
      return;
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    const { activeOrders, completedOrders } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView>
        {activeOrders.length == 0 && completedOrders.length == 0 && <Text h4>Nothing here...</Text>}

        {activeOrders.length != 0 && (
          <View>
            <Text h4>Active Orders</Text>

            <FlatList
              contentContainerStyle={styles.flatlist}
              data={activeOrders}
              renderItem={({ item }) => (
                <CustomerOrdersListItem order={item} navigation={navigation} />
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        )}

        {completedOrders != 0 && (
          <View>
            <Text h4>Previous Orders</Text>

            <FlatList
              contentContainerStyle={styles.flatlist}
              data={completedOrders}
              renderItem={({ item }) => (
                <CustomerOrdersListItem order={item} navigation={navigation} />
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  flatview: {}
});
