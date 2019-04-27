import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
} from "react-native";
import MenuListItem from "./MenuListItem";

export default class MenuList extends React.Component {
  getListOfItemNameDescriptionPrice = singleCategoryItems => {
    let ret = [];
    singleCategoryItems.forEach(item => {
      ret.push({
        itemName: item.itemName,
        description: item.description,
        basePrice: item.basePrice,
        entireItem: item
      });
    });
    return ret;
  };

  constructHeadingsAndItemsList = menuCategoriesAndItems => {
    let ret = [];
    menuCategoriesAndItems.forEach(singleCategoryAndItems => {
      const title = singleCategoryAndItems.categoryName;
      const dataForTitle = this.getListOfItemNameDescriptionPrice(
        singleCategoryAndItems.items
      );
      ret.push({ title: title, data: dataForTitle });
    });
    return ret;
  };

  render() {
    const dataForSectionList = this.constructHeadingsAndItemsList(
      this.props.categoriesAndTheirItems
    );

    return (
      <View>
        <SectionList
          sections={dataForSectionList}
          renderItem={({ item }) => (
            <MenuListItem navigation={this.props.navigation} itemSelected={item.entireItem}/>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text>{section.title}</Text>
            </View>
          )}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sectionHeader: {
    backgroundColor: "#00b4fc",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
