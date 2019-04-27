import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import { CardSection, Spinner } from '../components/common';
import { firebase_key } from 'react-native-env-json';

class AuthLoadingScreen extends Component {
  componentDidMount() {
    firebase.initializeApp(firebase_key);

    if (!firebase.apps.length) {
      //to prevent from intializing when its already been intialized
      firebase.initializeApp(config);
    }

    //event handler for signing and signing out
    firebase.auth().onAuthStateChanged(user => {
      const { navigate } = this.props.navigation;
      navigate(user ? 'MainMenu' : 'Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#4286f4',
  }
};

export default AuthLoadingScreen;
