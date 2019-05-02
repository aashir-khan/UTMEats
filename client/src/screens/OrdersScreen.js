import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, ThemeProvider, Divider } from 'react-native-elements';
import CustomerOrdersListItem from '../components/CustomerOrdersListItem';
import { Spinner } from '../components/common';
import firebase from '@firebase/app';
import '@firebase/auth';
import axios from 'axios';
import theme from '../theme/Theme';

export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    title: 'Orders',
    headerTitleStyle: theme.Header.headerTitleStyle,
    headerTintColor: theme.Header.headerTintColor,
    headerStyle: theme.Header.headerStyle
  };

  constructor(props) {
    super(props);
    this.state = {
      activeOrders: [],
      completedOrders: [],
      loading: true,
      getCustomerOrdersListener: null,
      currentTitle: 'Orders'
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
    const { activeOrders, completedOrders } = this.state;
    const { navigation } = this.props;

    const empty = activeOrders.length == 0 && completedOrders.length == 0;
    const active = activeOrders.length != 0;
    const completed = completedOrders.length != 0;

    return (
      <ThemeProvider theme={theme}>
        <ScrollView>
          {empty && <Text style={styles.title}>Nothing here...</Text>}

          {active && (
            <View>
              <Text style={styles.title}>Active Orders</Text>
              <Divider />

              <FlatList
                data={activeOrders}
                renderItem={({ item }) => (
                  <CustomerOrdersListItem order={item} navigation={navigation} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}

          {completed && (
            <View>
              <Text style={styles.title}>Previous Orders</Text>
              <Divider />

              <FlatList
                data={completedOrders}
                renderItem={({ item }) => (
                  <CustomerOrdersListItem order={item} navigation={navigation} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </ScrollView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  title: {
    marginLeft: 20,
    marginTop: 10
  }
});
