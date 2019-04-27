import React, { Component } from "react";
import CheckboxFormX from "react-native-checkbox-form";

//redux
import { connect } from "react-redux";
import { setChoice } from "../actions";
import { StyleSheet, View } from "react-native";

export class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.item
    };
  }

  //Create group of Check Buttons (user can pick multiple options)

  onCheckboxPressed = (item, sectionInfo) => {
    this.setState({ checked: item });

    const filteredArray = item.filter(element => element.checked === true);

    const temp = {
      sectionName: sectionInfo.sectionName,
      sectionOptions: filteredArray
    };

    this.props.setChoice(temp, sectionInfo.choiceGroupIndex);
  };

  render() {
    const section = this.props.section;
    return (
      <View style={styles.container}>
        <CheckboxFormX
          dataSource={this.state.checked}
          itemShowKey="name"
          itemCheckedKey="checked"
          iconSize={16}
          formHorizontal={false}
          labelHorizontal={true}
          onChecked={item => this.onCheckboxPressed(item, section)}
        />
      </View>
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
)(CheckboxGroup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});
