import React, { Component } from "react";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { Text } from "react-native";

//redux
import { connect } from "react-redux";
import { setChoice } from "../actions";

export class RadioGroupComponent extends Component {
  onRadioButtonPress = value => {
    const temp = {
      sectionName: value.sectionName,
      sectionOptions: [{ name: value.name, price: value.price }]
    };

    this.props.setChoice(temp, value.choiceGroupIndex);
  };

  //create group of Radio Buttons (when user can only pick 1 option)
  generateRadioGroupComponent = (items, currentSectionInfo) => {
    return (
      <RadioGroup onSelect={(index, value) => this.onRadioButtonPress(value)}>
        {this.generateRadioGroupItemComponents(items, currentSectionInfo)}
      </RadioGroup>
    );
  };

  //Create single Radio Button
  generateRadioGroupItemComponents = (options, currentSectionInfo) => {
    let ret = [];
    options.forEach(singleOption => {
      let merged = { ...singleOption, ...currentSectionInfo }; //merged the two objs

      ret.push(
        <RadioButton value={merged} key={singleOption.name.toString()}>
          <Text>{singleOption.name}</Text>
        </RadioButton>
      );
    });

    return ret;
  };

  render() {
    const { item, section } = this.props;
    return this.generateRadioGroupComponent(item, section);
  }
}

function mapStateToProps(state) {
  return {
    currentOrder: state.currentOrder
  };
}

export default connect(
  mapStateToProps,
  { setChoice }
)(RadioGroupComponent);
