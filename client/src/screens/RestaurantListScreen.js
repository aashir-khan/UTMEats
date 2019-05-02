import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {
  ListItem,
  Divider,
  Button,
  Icon,
  ThemeProvider
} from "react-native-elements";
import axios from "axios";
import theme from "../theme/Theme";
import { Spinner } from "../components/common";

export default class RestaurantListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Restaurants",
      headerTitleStyle: theme.Header.headerTitleStyle,
      headerTintColor: theme.Header.headerTintColor,
      headerStyle: theme.Header.headerStyle,

      headerRight: (
        <Button
          icon={
            <Icon
              name="md-cart"
              type="ionicon"
              color={theme.Header.headerTintColor}
            />
          }
          type="clear"
          iconRight
          onPress={() => {
            const { navigate } = navigation;
            navigate("Cart", {});
          }}
        />
      )
    };
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
        "https://utmeats.herokuapp.com/restaurants/getAll"
      );
      this.setState({
        loading: false,
        restaurants: restaurantAllResponse.data
      });
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
      <ThemeProvider theme={theme}>
        <FlatList
          data={this.state.restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate("Menu", { restaurant: item })}
            >
              <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: { uri: item.thumbnail } }}
              />
              <Divider />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ThemeProvider>
    );
  }
}
