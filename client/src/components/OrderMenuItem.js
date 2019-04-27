/**
 * To show a single ordered item from the menu.
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { Card } from "react-native-elements";

export default class OrderMenuItem extends React.Component {
  render() {
    const item = this.props.menuItem;

    //remove any null selections
    const sections = item.itemSections.filter(el => {
      return el != null;
    });

    return (
      <Card containerStyle={{ margin: 0, marginBottom: 8 }}>
        <View>
          <View style={styles.groupOne}>
            <Text style={styles.heading}>{this.props.menuItem.itemName}</Text>
            <Text>
              ${item.basePrice} x {item.quantity}
            </Text>
          </View>
          <Text>{item.description}</Text>

          <FlatList
            data={sections}
            renderItem={({ item }) => (
              <View>
                <Text>{item.sectionName}:</Text>
                <FlatList
                  data={item.sectionOptions}
                  renderItem={({ item }) => (
                    <SectionSelection selectionItem={item} />
                  )}
                  keyExtractor={(_, index) => index.toString()}
                />
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </Card>
    );
  }
}

class SectionSelection extends React.Component {
  // for an itemSelection: Choice of size, the SectionSelection would be {price: 0, name: "Medium"}

  render() {
    const price = this.props.selectionItem.price;
    const name = this.props.selectionItem.name;

    //don't want to show price for free
    if (price == 0) {
      return <Text style={styles.selectionText}>-{name}</Text>;
    } else {
      return (
        <Text style={styles.selectionText}>
          -{name} ${price}
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: "bold"
  },

  groupOne: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  selectionText: {
    marginLeft: 16
  }
});
