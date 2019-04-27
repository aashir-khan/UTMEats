import React from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import {
  Button,
  ThemeProvider,
  Icon
} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from '../theme/Theme';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerTitleStyle: theme.Header.headerTitleStyle,
    headerTintColor: theme.Header.headerTintColor,
    headerStyle: theme.Header.headerStyle
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Button
              title="Account"
              titleStyle={{ marginLeft: 5 }}
              type="clear"
              icon={<Icon name="md-person" type="ionicon" />}
              onPress={() => navigate('AccountSettings')}
            />

            <Button
              title="Payment"
              titleStyle={{ marginLeft: 5 }}
              type="clear"
              icon={<Icon name="payment" type="material" />}
              onPress={() => navigate('Payment')}
            />

            <Button
              title="Policy"
              titleStyle={{ marginLeft: 5 }}
              type="clear"
              icon={<Icon name="infocirlceo" type="antdesign" />}
              onPress={() => navigate('Policy')}
            />

            <Button
              title="Logout"
              titleStyle={{ marginLeft: 5 }}
              type="clear"
              icon={<Icon name="logout" type="antdesign" />}
              onPress={() => firebase.auth().signOut()}
            />
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
