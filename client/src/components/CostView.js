import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class CostView extends React.Component {
  render() {
    const costDetails = this.props.costDetails;

    return (
      <View style={styles.costContainer}>
        <Text style={styles.costHeading}>Costs</Text>
        <View>
          <Text>Food: ${costDetails.food.toFixed(2)}</Text>
          <Text>Delivery: ${costDetails.delivery.toFixed(2)}</Text>
          <Text>Tips: ${costDetails.tip.toFixed(2)}</Text>
          <Text>Food Tax: ${costDetails.foodTax.toFixed(2)}</Text>
          <Text>Delivery Tax: ${costDetails.deliveryTax.toFixed(2)}</Text>
          <Text style={styles.costTotal}>Total: ${costDetails.total.toFixed(2)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  costHeading: {
    marginTop: 4,
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: "center"
  },

  costTotal: {
    fontSize: 14,
    fontWeight: "bold"
  },

  costContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8
  }
});
