import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import axios from 'axios';
import theme from '../theme/Theme';
import { Spinner } from '../components/common';

export default class RestaurantListScreen extends React.Component {
  static navigationOptions = {
    title: 'Restaurants',
    headerTitleStyle: theme.Header.headerTitleStyle,
    headerTintColor: theme.Header.headerTintColor,
    headerStyle: theme.Header.headerStyle
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getAllRestaurants();
  }

  async getAllRestaurants() {
    try {
      this.setState({ loading: true });
      const restaurantAllResponse = await axios.get(
        'https://utmeats.herokuapp.com/restaurants/getAll'
      );
      this.setState({ loading: false, restaurants: restaurantAllResponse.data });
    } catch (err) {
      console.log(err);
      return;
    }
  }

  renderWillUnmount() {}

  render() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <FlatList
          style={{ padding: 15 }}
          data={this.state.restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigate('Menu', { restaurant: item })}>
              <ListItem
                title={item.name}
                titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
                subtitle={item.description}
                leftAvatar={{
                  rounded: false,
                  size: 'large',
                  source: { uri: item.thumbnail },
                  style: {
                    width: 80,
                    height: 80,
                    backgroundColor: 'rgba(0,0,0,0)'
                  },
                  overlayContainerStyle: {
                    backgroundColor: 'rgba(0,0,0,0)'
                  },
                  avatarStyle: {
                    borderRadius: 15
                  }
                }}
              />
              <Divider style={{ backgroundColor: 'rgba(0,0,0,0.2)', marginTop: 10 }} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  flatlist: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  flatview: {}
});
