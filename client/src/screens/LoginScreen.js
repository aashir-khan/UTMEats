import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Label,
  Input,
  ValidationMessage,
  Button,
  Image,
  ThemeProvider,
  Text
} from 'react-native-elements';
import FullWidthImage from 'react-native-fullwidth-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from '../theme/Theme';

import firebase from '@firebase/app';
import '@firebase/auth';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginFail() {
    console.log('Login failed');
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    //reset email pwd
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView>
          <View>
            <FullWidthImage
              style={styles.waves}
              source={require('../assets/images/login-waves.png')}
              width={75}
              height={50}
            />
            <FullWidthImage
              source={require('../assets/images/login-waves-logo.png')}
              width={75}
              height={50}
            />
          </View>
          <View style={styles.lower}>
            <Input
              placeholder="Email"
              leftIcon={{
                type: 'ionicon',
                name: 'md-mail',
                iconStyle: styles.icon,
                size: 18,
                color: theme.colors.primary
              }}
              onChangeText={email => this.setState({ email })}
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              leftIcon={{
                type: 'ionicon',
                name: 'md-unlock',
                iconStyle: styles.icon,
                size: 20,
                color: theme.colors.primary
              }}
              onChangeText={password => this.setState({ password })}
              errorMessage={this.state.error}
            />
            <Button title="Log in" type="solid" onPress={this.onButtonPress.bind(this)} />
            <Text style={styles.registerText}>
              Don't have an account?{' '}
              <Text onPress={() => navigate('Register')} style={{ color: theme.colors.primary }}>
                Register.
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}

// <Button title="Register" onPress={() => navigate('Register')} />

const styles = StyleSheet.create({
  lower: {
    padding: 50,
    paddingTop: 30
  },
  registerText: {
    textAlign: 'center',
    margin: 15
  },
  waves: {
    position: 'absolute',
    tintColor: theme.colors.primary
  }
});

// <Card>
//   <CardSection>
//     <Input
//       placeholder="user@gmail.com"
//       label="Email"
//       value={this.state.email}
//       onChangeText={email => this.setState({ email })}
//     />
//   </CardSection>
//
//   <CardSection>
//     <Input
//       secureTextEntry //just listing => True
//       placeholder="password"
//       label="Password"
//       value={this.state.password}
//       onChangeText={password => this.setState({ password })}
//     />
//   </CardSection>
//
//   <Text style={styles.errorTextStyle}>{this.state.error}</Text>
//
//   <CardSection>{this.renderLoginButton()}</CardSection>
//
//   <CardSection>{this.renderRegisterButton()}</CardSection>
// </Card>

export default LoginScreen;
