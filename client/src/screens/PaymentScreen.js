import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform } from 'react-native';
import stripe from 'tipsi-stripe';
import firebase from '@firebase/app';
import '@firebase/auth';
import { Spinner } from '../components/common';
import { Button, ThemeProvider } from 'react-native-elements';
import { addCustomerCardBackend, removeCustomerBackend } from '../helpers/paymentHelpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { stripe_key } from 'react-native-env-json';
import theme from '../theme/Theme';

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Payment',
    headerTitleStyle: theme.Header.headerTitleStyle,
    headerTintColor: theme.Header.headerTintColor,
    headerStyle: theme.Header.headerStyle
  };

  constructor(props) {
    super(props);
    this.state = {
      canUseGooglePay: null,
      userId: firebase.auth().currentUser.uid,
      loading: true
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    stripe.setOptions(stripe_key);
    const isDeviceSupportsNativePay = await stripe.deviceSupportsNativePay();
    const isUserHasAtLeastOneCardInGooglePay = await stripe.canMakeNativePayPayments();
    this.setState({
      canUseGooglePay: isDeviceSupportsNativePay && isUserHasAtLeastOneCardInGooglePay,
      loading: false
    });
  }

  addCardRegularWay = async () => {
    try {
      // this brings up GUI
      const tokenObj = await stripe.paymentRequestWithCardForm();
      const tokenId = tokenObj.tokenId;
      const addCustomerCardResult = await addCustomerCardBackend(this.state.userId, tokenId);
      if (addCustomerCardResult.status === 200) {
        Alert.alert('Successfully added payment method');
      }
    } catch (error) {
      // don't want to throw error message if user just wanted to cancel dialog box
      if (error.message != 'Cancelled by user') {
        console.log(error);
        Alert.alert('There was an error adding the payment method');
      }
    }
  };

  addCardAndroidPay = async () => {
    try {
      const options = {
        total_price: '0.00',
        currency_code: 'cad',
        shipping_address_required: false,
        billing_address_required: false,
        line_items: []
      };
      const tokenObj = await stripe.paymentRequestWithAndroidPay(options);
      const tokenId = tokenObj.tokenId;
      const addCustomerCardResult = await addCustomerCardBackend(this.state.userId, tokenId);
      if (addCustomerCardResult.status === 200) {
        Alert.alert('Successfully added payment method');
      }
    } catch (error) {
      // don't want to throw error message if user just wanted to cancel dialog box
      if (error.message != 'Purchase was cancelled') {
        console.log(error);
        Alert.alert('Issue with using Android Pay');
        return;
      }
    }
  };

  removeCustomer = async () => {
    try {
      const removeCustomerResult = await removeCustomerBackend(this.state.userId);
      if (removeCustomerResult.status == 200) {
        Alert.alert('Successfully removed payment method');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error removing payment method');
    }
  };

  render() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Button title="Add Credit Card" type="clear" onPress={this.addCardRegularWay} />

            {this.state.canUseGooglePay && Platform.OS == 'android' && (
              <Button
                title="Add Payment Card Using Android Pay"
                type="clear"
                onPress={this.addCardAndroidPay}
              />
            )}

            <Button title="Remove Payment Method" type="clear" onPress={this.removeCustomer} />
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
  }
});
