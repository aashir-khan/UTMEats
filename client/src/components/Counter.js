import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  increment = () => {
    // this.setState({count: this.props.initialValue + 1});

    //pass to parent click handler
    let { onClick } = this.props;
    onClick(this.props.initialValue + 1);
  };

  decrement = () => {
    if (this.props.initialValue > 1) {
      // this.setState({count: this.props.initialValue - 1})

      //pass to parent click handler
      let { onClick } = this.props;
      onClick(this.props.initialValue - 1);
    }
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          justifyContent: "space-between"
        }}
      >
        <Button onPress={this.decrement} title="-" />
        <Text>{this.props.initialValue}</Text>
        <Button onPress={this.increment} title="+" />
      </View>
    );
  }
}
