import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class MenuListItem extends React.Component {
  render() {
    const itemSelected = this.props.itemSelected;
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          this.props.navigation.navigate('SingleItem', { itemSelected: itemSelected });
        }}>
        <Text>Item Name: {itemSelected.itemName}</Text>
        <Text>Description: {itemSelected.description}</Text>
        <Text>Price: ${itemSelected.basePrice.toFixed(2)}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
