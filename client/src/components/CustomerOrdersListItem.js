import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';

export default class CustomerOrdersListItem extends React.Component {
  render() {
    const { order } = this.props;

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderStatus', order)}>
        <ListItem
          title={order.restaurant.name}
          subtitle={
            <View style={styles.nameContainer}>
              <Text key={'1'} style={styles.subtitleBolded}>
                {'Items:'}
              </Text>

              {order.items.map((item, key) => {
                return (
                  <Text style={styles.subtitle} key={key}>
                    {'- ' + item.itemName}
                  </Text>
                );
              })}

              <Text key={'2'} style={styles.subtitleBolded}>
                {'Total cost: $' + order.costs.total}
              </Text>
            </View>
          }
          leftAvatar={{ source: { uri: order.restaurant.thumbnail } }}
        />
        <Divider />
      </TouchableOpacity>
    );
  }
}

// <View style={styles.card}>
//   <View style={styles.nameContainer}>
//     <Text style={styles.name}>{order.restaurant.name}</Text>
//
//     <Text style={styles.subtitleBolded}>{'Items:'}</Text>
//     {order.items.map((item, key) => {
//       return (
//         <Text style={styles.subtitle} key={key}>
//           {'- ' + item.itemName}
//         </Text>
//       );
//     })}
//
//     <Text style={styles.subtitleBolded}>{'Total cost: $' + order.costs.total}</Text>
//   </View>
//   <View style={styles.imageContainer}>
//     <Image style={styles.image} source={{ uri: order.restaurant.thumbnail }} />
//   </View>
// </View>

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(240,240,240)'
  },
  image: {
    width: 60,
    height: 60
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  nameContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  subtitle: {
    fontSize: 14
  },
  subtitleBolded: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
