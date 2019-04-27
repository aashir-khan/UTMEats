import React, { Component } from "react";
import { TextInput } from "react-native";

//redux
import { connect } from "react-redux";
import { setChoice } from "../actions";

export class SpecialInstructionsInputBox extends Component {
  handleSpecialInstructions = (givenText, sectionInfo) => {
    const temp = {
      sectionName: sectionInfo.sectionName,
      text: givenText
    };

    this.props.setChoice(temp, sectionInfo.choiceGroupIndex);
  };

  render() {
    const section = this.props.section;
    return (
      <TextInput
        onChangeText={text => this.handleSpecialInstructions(text, section)}
        placeholder={section.text}
        maxLength={150}
      />
    );
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
)(SpecialInstructionsInputBox);
