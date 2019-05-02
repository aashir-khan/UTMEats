/**
 * To show the a whole order, its items, and its cost.
 */

import React from "react";
import { Text, StyleSheet, FlatList, ScrollView } from "react-native";

import OrderMenuItem from "./OrderMenuItem";
import CostView from "./CostView";

export default class Order extends React.Component {
  render() {
    const itemsOrdered = this.props.itemsOrdered;
    const costDetails = this.props.costDetails;

    return (
      <ScrollView>
        <Text style={styles.itemHeading}>Items</Text>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={itemsOrdered}
          renderItem={({ item }) => <OrderMenuItem menuItem={item} />}
          keyExtractor={(_, index) => index.toString()}
        />

        <CostView costDetails={costDetails} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  itemHeading: {
    marginTop: 4,
    fontSize: 24,
    textAlign: "center"
  },

  flatlist: {
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 10,
    paddingVertical: 10
  }
});
