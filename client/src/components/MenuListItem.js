import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class MenuListItem extends React.Component {
  render() {
    const itemSelected = this.props.itemSelected;
    const restaurantId = this.props.restaurantId;
    const darken = this.props.index % 2 != 0;

    return (
      <TouchableOpacity
        style={darken ? styles.darkRow : styles.row}
        onPress={() => {
          this.props.navigation.navigate('SingleItem', {
            restaurantId: restaurantId,
            itemSelected: itemSelected
          });
        }}>
        <Text style={styles.name}>{itemSelected.itemName}</Text>
        <Text style={styles.description}>Description: {itemSelected.description}</Text>
        <Text style={styles.price}>Price: ${itemSelected.basePrice.toFixed(2)}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  darkRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.01)'
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  name: {
    fontWeight: 'bold'
  }
});
