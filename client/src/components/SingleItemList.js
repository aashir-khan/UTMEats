import React, { Component } from 'react';
import { StyleSheet, Text, View, SectionList, ScrollView } from 'react-native';

import CheckboxGroup from './CheckboxGroup';
import RadioGroupComponent from './RadioGroup';
import SpecialInstructionsInputBox from './SpecialInstructionsInputBox';

import { connect } from 'react-redux';
import {  initializeItem, setQuantity, addItemToCart } from '../actions';

class SingleItemList extends React.Component {
  componentDidMount() {
    const itemSelected = this.props.itemSelected;

  
    

    //fill in the item info
    const item = this.filterItemInfo(itemSelected);

    //need to initialize array size
    const temp = { itemSections: new Array(itemSelected.itemSections.length) };

    this.props.initializeItem({ ...item, ...temp, ...{ quantity: 1 } }); //merge
  }

  //filter only relevant fields
  filterItemInfo = ({ itemId, itemName, description, basePrice }) => ({
    itemId,
    itemName,
    description,
    basePrice
  });

  getSingleSectionOptionsList = optionsOfSingleSection => {
    let ret = [];
    optionsOfSingleSection.forEach(option => {
      let extraDisplay = '';
      if (option.price != 0) {
        extraDisplay = ` (+$${option.price.toFixed(2)})`;
      }
      ret.push({ name: `${option.name}${extraDisplay}`, price: option.price });
    });
    // we want to return a single element array containing all the options in the first element of single element array
    // this is because we have to return an array of choices for current item, and we don't want it making each
    // item for a given button group as being an option, but rather all those options
    // should be considered one piece of data for button group (which is an item for sectionList)
    return [ret];
  };

  constructHeadingsAndItemsList = itemSectionsAndOptions => {
    let ret = [];

    let groupIndex = 0;

    itemSectionsAndOptions.forEach(singleSectionAndOptions => {
      const sectionName = singleSectionAndOptions.sectionName;
      if (sectionName != 'Special Instructions') {
        const optionsList = this.getSingleSectionOptionsList(
          singleSectionAndOptions.sectionOptions
        );
        ret.push({
          title: sectionName,
          data: optionsList,
          choiceGroupIndex: groupIndex
        });
      } else {
        // have to wrap with single element because the value of data is a list of options for current item,
        // otherwise it will treat the 'text' as an array of letters
        ret.push({
          title: sectionName,
          data: [singleSectionAndOptions.text],
          choiceGroupIndex: groupIndex
        });
      }

      groupIndex++;
    });
    return ret;
  };

  renderListItem = (item, section, itemSelected) => {
    const sectionIndex = section.choiceGroupIndex;
    const currentSection = itemSelected.itemSections[sectionIndex];
    const temp = { ...section, ...currentSection };

    if (temp.hasOwnProperty('minMaxSelection')) {
      if (temp.minMaxSelection.max == 1) {
        return <RadioGroupComponent item={item} section={temp} />;
      } else {
        return <CheckboxGroup item={item} section={temp} />;
      }
    } else {
      return <SpecialInstructionsInputBox section={temp} />;
    }
  };

  render() {
    const itemSelected = this.props.itemSelected;
    const dataForSectionList = this.constructHeadingsAndItemsList(itemSelected.itemSections);

    return (
      <ScrollView>
        <SectionList
          sections={dataForSectionList}
          renderItem={({ item, section }) => {
            return this.renderListItem(item, section, itemSelected);
          }}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text>{section.title}</Text>
            </View>
          )}
          keyExtractor={(item, index) => item + index}
        />
      </ScrollView>
    );
  } //end render
} //end component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sectionHeader: {
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

function mapStateToProps(state) {
  return {
    currentOrder: state.currentOrder,
    cart: state.cart
  };
}

export default connect(
  mapStateToProps,
  { initializeItem, setQuantity, addItemToCart }
)(SingleItemList);
