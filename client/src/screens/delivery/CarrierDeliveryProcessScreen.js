import React, { Component } from 'react';
import { BackHandler, Alert, Button } from 'react-native';
import axios from 'axios';
import { Spinner } from '../../components/common';
import CarrierAcceptedOrderComponent from '../../components/delivery/CarrierAcceptedOrderComponent';
import CarrierAtRestaurantComponent from '../../components/delivery/CarrierAtRestaurantComponent';
import CarrierOnWayCustomerComponent from '../../components/delivery/CarrierOnWayCustomerComponent';
import CarrierCompletedDeliveryComponent from '../../components/delivery/CarrierCompletedDeliveryComponent';
import { StackActions, NavigationActions } from 'react-navigation';

export default class CarrierDeliveryProcessScreen extends Component {
  static navigationOptions = {
    title: 'Delivery Process',
    // prevent carrier from navigating away from delivery process screen
    headerLeft: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      // this is how the process begins upon a carrier accepting an order
      deliveryProcessStatus: 'accepted',
      loading: true,
      orderId: null,
      orderDetails: 'dsadaa',
      customerDetails: null,
      restaurantDetails: null
    };
  }

  async componentDidMount() {
    // prevent back button from being pressed
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    this.setState({ loading: true });
    const { navigation } = this.props;

    try {
      const orderId = navigation.getParam('orderId', {});
      this.setState({ orderId: orderId });

      const orderResponse = await axios.get(
        'https://utmeats.herokuapp.com/order/getOrder?orderId=' + orderId
      );
      const orderDetails = orderResponse.data;
      this.setState({ orderDetails: orderDetails });

      const customerDetailsResponse = await axios.get(
        'https://utmeats.herokuapp.com/user/getUser?userId=' + orderDetails.customerId
      );
      const customerDetails = customerDetailsResponse.data;
      this.setState({ customerDetails: customerDetails });

      const restaurantResponse = await axios.get(
        'https://utmeats.herokuapp.com/restaurants/getOneRestaurant?restaurantId=' +
          orderDetails.restaurantId
      );
      const restaurantDetails = restaurantResponse.data;
      this.setState({ restaurantDetails: restaurantDetails });

      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      return;
    }
  }

  componentWillUnmount() {
    // allow back button to be pressed again, not sure if I did this correctly
    BackHandler.removeEventListener('hardwareBackPress', () => {
      Alert.alert('about to unmount');
    });
  }

  // for child components to be able to update parent state of delivery process stage
  updateDeliveryProcessStatus = newStageValue => {
    this.setState({ deliveryProcessStatus: newStageValue });

    // we are done delivering, so navigate carrier back to orders screen
    if (newStageValue === 'completed') {
      const { navigation } = this.props;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Deliver'
          })
        ]
      });
      navigation.dispatch(resetAction);
    }
  };

  render() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    if (this.state.deliveryProcessStatus === 'accepted') {
      return (
        <CarrierAcceptedOrderComponent
          orderId={this.state.orderId}
          customerDetails={this.state.customerDetails}
          restaurantDetails={this.state.restaurantDetails}
          orderDetails={this.state.orderDetails}
          updateDeliveryProcessStatus={this.updateDeliveryProcessStatus}
        />
      );
    } else if (this.state.deliveryProcessStatus === 'at restaurant') {
      return (
        <CarrierAtRestaurantComponent
          orderId={this.state.orderId}
          customerDetails={this.state.customerDetails}
          restaurantDetails={this.state.restaurantDetails}
          orderDetails={this.state.orderDetails}
          updateDeliveryProcessStatus={this.updateDeliveryProcessStatus}
        />
      );
    } else if (this.state.deliveryProcessStatus === 'picked up food') {
      return (
        <CarrierOnWayCustomerComponent
          orderId={this.state.orderId}
          customerDetails={this.state.customerDetails}
          restaurantDetails={this.state.restaurantDetails}
          orderDetails={this.state.orderDetails}
          updateDeliveryProcessStatus={this.updateDeliveryProcessStatus}
        />
      );
    } else if (this.state.deliveryProcessStatus === 'on way customer') {
      return (
        <CarrierCompletedDeliveryComponent
          orderId={this.state.orderId}
          customerDetails={this.state.customerDetails}
          restaurantDetails={this.state.restaurantDetails}
          orderDetails={this.state.orderDetails}
          updateDeliveryProcessStatus={this.updateDeliveryProcessStatus}
        />
      );
      // placeholder since you have to return something since CarrierCompletedDeliveryComponent updates state via updateDeliveryProcessStatuss
    } else if (this.state.deliveryProcessStatus === 'completed') {
      return <Button title="Finished Delivery" />;
    }
  }
}
