import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from '../theme/Theme';

import axios from 'axios';
import firebase from '@firebase/app';
import '@firebase/auth';

export default class RegisterScreen extends Component {
  //title for the window
  static navigationOptions = {
    title: 'Register',
    headerTitleStyle: theme.Header.headerTitleStyle,
    headerTintColor: theme.Header.headerTintColor,
    headerStyle: theme.Header.headerStyle
  };

  constructor(props) {
    super(props);
    this.state = {
      date: '1955-05-05',
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      phoneNumber: '',
      errors: ''
    };
  }

  //save other fields to user profile in DB once user creats account.
  async onCreateAccountSuccess(user) {
    const { firstName, lastName, date, email, phoneNumber } = this.state;

    var data = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: date,
      email: email,
      phoneNumber: phoneNumber,
      userId: user.user.uid
    };

    //add to firebase through our custom backend
    try {
      const result = await axios.post(
        'https://utmeats.herokuapp.com/user/onRegisterAddDetails',
        data
      );

      if (result.request.status === 500) {
        Alert.alert('Failed to make an account');
      } else {
        const { navigate } = this.props.navigation;
        navigate('Main', {});
      }
    } catch (error) {
      console.log(error);
    }
  }

  //called when user already has account
  onLoginSuccess() {
    const { navigate } = this.props.navigation;
    navigate('Main', {});
  }

  //on Failure
  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }

  validate(text, type) {}

  handleRegisterClick() {
    //validate fields

    const { email, password, firstName, lastName, phoneNumber } = this.state;

    //https://www.w3resource.com/javascript/form/email-validation.php
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()) || //email not valid
      firstName.trim() == '' ||
      lastName.trim() == '' ||
      password.trim() == '' ||
      phoneNumber.trim() == ''
    ) {
      this.state.error = 'Invalid Entries';

      // Works on both iOS and Android
      Alert.alert(
        'Invalid Entries',
        'Please fill in all the details correctly.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return; //stop from going further
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

      .then(this.onCreateAccountSuccess.bind(this))

      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          this.onLoginFailure.bind(this)('Weak password!');
        } else {
          this.onLoginFailure.bind(this)(errorMessage);
        }
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Input
              label="First Name"
              placeholder="Jon"
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />

            <Input
              label="Last Name"
              placeholder="Doe"
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />

            <Input
              label="Email"
              placeholder="jon.doe@gmail.com"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />

            <Input
              label="Password"
              placeholder="Password"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />

            <Input
              label="Phone Number"
              placeholder="Phone Number"
              keyboardType={'phone-pad'}
              value={this.state.phoneNumber}
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
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
              style={styles.datePicker}
              date={this.state.date}
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
              onDateChange={date => this.setState({ date })}
            />

            <Button
              onPress={this.handleRegisterClick.bind(this)}
              title="Create Account"
              accessibilityLabel="Register your account"
            />

            <Text style={styles.errorTextStyle}>{this.state.errors}</Text>
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}

const styles = {
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
};
