import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CardSection } from '../components/common';
import axios from 'axios';
import { Rating, Button, Overlay, Icon } from 'react-native-elements';
import Communications from 'react-native-communications';

import Order from '../components/Order';

// show order info for a single order

export default class OrderStatusScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.navigation.state.params.status,
      ETA: props.navigation.state.params.ETA,
      rating: props.navigation.state.params.orderRating, //will be -1 if no review,
      carrierId: '',
      carrierPhone: '9999999999',
      isVisible: false
    };
  }

  static navigationOptions = {
    title: 'Order Status'
  };

  getOrderStatusETAAndRating() {
    const orderDetails = this.props.navigation.state.params;
    const orderId = orderDetails.id;

    // get the latest status of the order
    axios
      .get('https://utmeats.herokuapp.com/order/getOrderStatusEtaAndRating?orderId=' + orderId)
      .then(response => {
        if (response.data.orderRating) {
          this.setState({
            status: response.data.newStatus,
            ETA: response.data.newETA,
            rating: response.data.orderRating
          });
        } else {
          this.setState({
            status: response.data.newStatus,
            ETA: response.data.newETA,
            rating: -1 //no review present
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    const orderDetails = this.props.navigation.state.params;
    const orderId = orderDetails.id;
    //call function every n/1000 seconds
    axios
      .get('https://utmeats.herokuapp.com/order/getOrder?orderId=' + orderId)
      .then(response => {
        this.setState({
          carrierId: response.data.carrierId
        });
        axios
          .get('https://utmeats.herokuapp.com/user/getUser?userId=' + this.state.carrierId)
          .then(response => {
            this.setState({
              carrierPhone: response.data.phoneNumber
            });
            //Alert.alert(this.state.carrierPhone);
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });

    this.intervalId = setInterval(this.getOrderStatusETAAndRating.bind(this), 5000);
  }

  componentWillUnmount() {
    // clear interval to avoid memory leaks; don't want to update state when it doesn't exist.
    clearInterval(this.intervalId);
  }

  renderRating(id) {
    const { navigate } = this.props.navigation;

    if (this.state.rating != -1) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Rating </Text>
          <Rating imageSize={20} readonly startingValue={this.state.rating * 5} />
        </View>
      );
    }

    //this order hasn't been reviewed yet. (ie no rating set)
    return <Button title="Rate" onPress={() => navigate('Rate', { orderId: id })} />;
  }

  render() {
    const orderDetails = this.props.navigation.state.params;
    const costDetails = orderDetails.costs;

    return (
      <View style={styles.container}>
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          height={100}>
          <View>
            <Button
              type="clear"
              icon={<Icon name="call" />}
              title="Call the Carrier"
              onPress={() => {
                this.setState({ isVisible: !this.state.isVisible });
                Communications.phonecall(this.state.carrierPhone, true);
              }}
            />

            <Button
              type="clear"
              icon={<Icon name="message" />}
              title="Text the Carrier"
              onPress={() => {
                this.setState({ isVisible: !this.state.isVisible });
                Communications.text(this.state.carrierPhone);
              }}
            />
          </View>
        </Overlay>

        <CardSection>
          <View style={styles.groupOneContainer}>
            <View>
              <Text style={styles.heading}>{orderDetails.restaurant.name}</Text>
              <Text>Status: {this.state.status}</Text>
              <Text>ETA: {this.state.ETA}</Text>

              {this.renderRating(orderDetails.id)}

              <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
                <View style={styles.holder}>
                  <Text style={{ color: 'blue' }}>Contact Carrier</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: orderDetails.restaurant.thumbnail }} />
            </View>
          </View>
        </CardSection>

        <Order itemsOrdered={orderDetails.items} costDetails={costDetails} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 8
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left'
  },

  groupOneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },

  image: {
    width: 60,
    height: 60
  },
  imageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',

    flex: 1,
    flexDirection: 'row'
  }
});
