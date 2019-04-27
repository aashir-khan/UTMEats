import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating, ButtonGroup, Button, AirbnbRating } from 'react-native-elements';
import axios from 'axios';

export default class RateScreen extends React.Component {
  static navigationOptions = {
    title: 'Rate'
  };

  constructor(props) {
    super(props);

    this.state = { selectedIndexes: [], firstName: '', lastName: '' };
    this.rating = 3; //default rating
    this.commentButtons = ['Took too Long ', 'Too Hot/Cold', 'Missing Items'];
    this.orderId = this.props.navigation.state.params.orderId;

    this.submitReview = this.submitReview.bind(this);
  }

  componentDidMount() {
    // get name of the carrier
    axios
      .get('https://utmeats.herokuapp.com/order/getCarrierName', {
        params: { orderId: this.orderId }
      })
      .then(response => {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  submitReview() {
    const comments = [];

    //go through the indexes selected by user
    this.state.selectedIndexes.forEach(val => {
      comments.push(this.commentButtons[val]);
    });

    const data = { orderId: this.orderId, rating: this.rating / 5, comments: comments };

    axios
      .post('https://utmeats.herokuapp.com/order/addReview', data)
      .then(response => {
        const { navigate } = this.props.navigation;
        navigate('OrderStatus', {});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { selectedIndexes } = this.state;

    //https://react-native-training.github.io/react-native-elements/docs/button_group.html#selectedindexes

    return (
      <View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.heading}>Order ID: {this.orderId} </Text>
          <Text style={styles.heading}>
            Carrier Name: {this.state.firstName} {this.state.lastName}
          </Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <AirbnbRating
            count={5}
            reviews={['Terrible', 'OK', 'Good', 'Very Good', 'Amazing']}
            defaultRating={this.rating}
            onFinishRating={rating => {
              this.rating = rating;
            }}
          />
        </View>

        <Text style={styles.heading}>Any Comments?</Text>
        <ButtonGroup
          selectMultiple={true}
          onPress={selectedIndexes => {
            this.setState({ selectedIndexes });
          }}
          buttons={this.commentButtons}
          selectedIndexes={selectedIndexes}
        />

        <Button title="Submit Review" onPress={this.submitReview} />
      </View>
    );
  }
} //end class

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    textAlign: 'left'
  }
});
