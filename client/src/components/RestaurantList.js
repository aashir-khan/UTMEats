import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Button } from 'react-native';
import RestaurantListItem from './RestaurantListItem';
import axios from 'axios';

export default class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  render() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={this.state.restaurants}
          renderItem={({ item }) => (
            <RestaurantListItem restaurant={item} navigation={this.props.navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  flatview: {}
});
