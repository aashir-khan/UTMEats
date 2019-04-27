/**
 * To show the a whole order, its items, and its cost.
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

import OrderMenuItem from './OrderMenuItem';

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

        <View style={styles.costContainer}>
          <Text style={styles.costHeading}>Costs</Text>
          <View>
            <Text>Food: ${costDetails.food}</Text>
            <Text>Delivery: ${costDetails.delivery}</Text>
            <Text>Tips: ${costDetails.tip}</Text>
            <Text>Food Tax: ${costDetails.foodTax}</Text>
            <Text>Delivery Tax: ${costDetails.deliveryTax}</Text>
            <Text style={styles.costTotal}>Total: ${costDetails.total}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  itemHeading: {
    marginTop: 4,
    fontSize: 24,
    textAlign: 'center'
  },

  costHeading: {
    marginTop: 4,
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: 'center'
  },

  costTotal: {
    fontSize: 14,
    fontWeight: 'bold'
  },

  costContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8
  },

  flatlist: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingVertical: 10
  }
});
