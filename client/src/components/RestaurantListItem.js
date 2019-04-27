import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default class RestaurantListItem extends React.Component {
  render() {
    // a single restaurant with everything
    const restaurant = this.props.restaurant;
    return (
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={() =>
          this.props.navigation.navigate("Menu", { restaurant: restaurant })
        }
      >
        <View style={styles.card}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{restaurant.name}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: restaurant.thumbnail }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(240,240,240)"
  },
  image: {
    width: 60,
    height: 60
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  nameContainer: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  subtitle: {
    fontSize: 14
  }
});
