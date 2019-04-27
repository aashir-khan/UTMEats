import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import axios from 'axios';
import { Rating, Input, ThemeProvider, Button } from 'react-native-elements';
import { Spinner } from '../components/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import theme from '../theme/Theme';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Account',
    headerTitleStyle: theme.Header.headerTitleStyle,
    headerTintColor: theme.Header.headerTintColor,
    headerStyle: theme.Header.headerStyle
  };

  state = {
    rating: -1,
    firstName: '',
    lastName: '',
    dateOfBirth: '1955-05-05',
    phoneNumber: '',
    loading: true
  };

  constructor(props) {
    super(props);
    (this.firstName = ''), (this.lastName = ''), (this.phoneNumber = ''), (this.dateOfBirth = '');
  }

  getUserDetails() {
    this.setState({ loading: true });
    var user = firebase.auth().currentUser;

    axios
      .get('https://utmeats.herokuapp.com/user/getUser?userId=' + user.uid)
      .then(response => {
        this.setState({
          email: user.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber,
          dateOfBirth: response.data.dateOfBirth,
          loading: false
        });

        //if the user has reviews
        if (response.data.rating) {
          const totalRating = response.data.rating.totalRating;
          const totalReviews = response.data.rating.totalReviews;
          this.setState({
            rating: totalRating / totalReviews
          });
        } else {
          //has no rating, so set -1 to now render the stars
          this.setState({
            rating: -1
          });
        }
      })
      .catch(err => {
        Alert.alert('Failed to retrieve user info');
      });
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener('didFocus', () => {
      this.getUserDetails();
    });
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  async onButtonPress() {
    var user = firebase.auth().currentUser;
    const { firstName, lastName, dateOfBirth, phoneNumber } = this.state;

    var data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      userId: user.uid
    };

    try {
      //add to firebase through our custom backend
      const result = await axios.post('https://utmeats.herokuapp.com/user/updateUser', data);

      if (result.request.status === 500) {
        Alert.alert('Failed to update account');
      } else {
        Alert.alert('Account Updated!');
      }
    } catch (error) {
      Alert.alert('Failed to update account');
    }
  }

  renderRating() {
    if (this.state.rating != -1) {
      return (
        <View>
          <Input label="Rating" inputContainerStyle={{ display: 'none' }} />
          <Rating
            imageSize={20}
            readonly
            startingValue={this.state.rating * 5}
            style={{
              alignSelf: 'flex-start',
              marginLeft: 10,
              marginBottom: 20
            }}
          />
        </View>
      );
    }
    //this order hasn't been reviewed yet. (ie no rating set)
    return <View />;
  }

  render() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {this.renderRating()}
            <Input
              placeholder="user@gmail.com"
              label="Email"
              value={this.state.email}
              editable={false}
            />

            <Input
              placeholder="Phone Number"
              label="Phone Number"
              value={this.state.phoneNumber}
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
            />

            <Input
              placeholder="first Name"
              label="First Name"
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />

            <Input
              placeholder="Last Name"
              label="Last Name"
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />

            <Input
              label="Date of Birth"
              placeholder=""
              inputContainerStyle={{ display: 'none' }}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />

            <DatePicker
              date={this.state.dateOfBirth}
              mode="date"
              androidMode="spinner"
              placeholder="yyyy-mm-dd"
              format="YYYY-MM-DD"
              minDate="1900-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  borderColor: 'rgba(0,0,0,0)',
                  shadowColor: 'rgba(0,0,0,0)',
                  alignItems: 'flex-start'
                },
                dateText: {
                  fontSize: 16,
                  marginLeft: 5,
                  color: 'rgba(0,0,0,0.35)'
                },
                placeholderText: {
                  fontSize: 16,
                  marginLeft: 5,
                  color: 'rgba(0,0,0,0.35)'
                }
              }}
              showIcon={true}
              onDateChange={dateOfBirth => this.setState({ dateOfBirth })}
            />

            <Button onPress={this.onButtonPress.bind(this)} title="Update" />
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    paddingTop: 20
  },
  datePicker: {
    width: 170,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    shadowColor: 'rgba(0,0,0,0)'
  }
});
