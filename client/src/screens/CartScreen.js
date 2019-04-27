import React from "react";
import { StyleSheet, Text, View, FlatList, Alert, Picker } from "react-native";
import { Button, ButtonGroup, Input } from "react-native-elements";
import firebase from "@firebase/app";
import { connect } from "react-redux";

import "@firebase/auth";
import axios from "axios";

import { resetCart } from "../actions";

import OrderMenuItem from "../components/OrderMenuItem";

const FOOD_TAX = 0.13;
const DELIVERY_TAX = 0.13;
const DELIVERY = 5;

export class CartScreen extends React.Component {
  static navigationOptions = {
    title: "Checkout Cart"
  };

  constructor(props) {
    super(props);
    this.state = {
      food: 0,
      delivery: DELIVERY,
      deliveryTax: DELIVERY * DELIVERY_TAX,
      foodTax: FOOD_TAX,
      tip: 0,
      totalCost: 0,
      deliveryInstructions: "",
      deliveryLocation: "CCT",
      selectedTipBtnIndex: 0
    };

    this.userId = firebase.auth().currentUser.uid;

    this.tipBtnGroupHandler = this.tipBtnGroupHandler.bind(this);
    this.calculateTotalCost = this.calculateTotalCost.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleBuildingSelection = this.handleBuildingSelection.bind(this);
  }

  tipBtnGroupHandler(selectedIndex) {
    this.setState(
      {
        selectedTipBtnIndex: selectedIndex,
        tip: selectedIndex * 2
      },
      () => {
        //update total after tip has been set
        this.calculateTotalCost();
      }
    );
  }

  handlePlaceOrder() {
    const cart = this.props.cart;

    if (cart.items.length < 1) {
      Alert.alert("Cart is empty!");
      return;
    }

    const data = {
      userId: this.userId,
      restaurantId: cart.restaurantId,
      deliveryInstructions: this.state.deliveryInstructions,
      deliveryLocation: this.state.deliveryLocation,
      items: cart.items,
      costs: {
        food: this.state.food,
        foodTax: this.state.foodTax,
        delivery: this.state.delivery,
        deliveryTax: this.state.deliveryTax,
        total: this.state.totalCost,
        tip: this.state.tip
      }
    };

    axios
      .get(
        "https://utmeats.herokuapp.com/payment/verifyIsCustomer?userId=" +
          this.userId
      )
      .then(response => {
        // user doesn't have a credit card set up
        if (!response.data.isCustomer) {
          Alert.alert("Please add a payment method");

          return -1;
        }

        return axios.post("https://utmeats.herokuapp.com/order/addOrder", data);
      })
      .then(res => {
        if (res == -1) {
          return;
        }

        //order placed successfully
        this.props.resetCart(); //reset the cart

        const { navigate } = this.props.navigation;
        navigate("RestaurantList", {});
      })
      .catch(error => {
        Alert.alert("Failed to place an order");
        navigate("RestaurantList", {});
      });
  }

  handlerInstructionsTextBox = text => {
    this.setState({ deliveryInstructions: text });
  };

  handleBuildingSelection(buildingName) {
    this.setState({ deliveryLocation: buildingName });
  }

  componentDidMount() {
    this.calculateFoodCost();
  }

  calculateTotalCost() {
    this.setState({
      totalCost: convertTwoDecimal(
        this.state.tip +
          this.state.food +
          this.state.foodTax +
          this.state.delivery +
          this.state.deliveryTax
      )
    });
  }

  calculateFoodCost() {
    let totalFoodCost = 0;

    for (let foodItem of this.props.cart.items) {
      let foodCost = foodItem.basePrice;

      //remove any null selections
      const sections = foodItem.itemSections.filter(el => {
        return el != null;
      });

      for (let section of sections) {
        // add up price for all selections

        if (section.sectionOptions) {
          //ex adding diff toppings with diff price
          section.sectionOptions.forEach(element => {
            foodCost += element.price;
          });
        }
      }

      foodCost = foodCost * foodItem.quantity;
      totalFoodCost += foodCost;
    }

    this.setState(
      {
        food: convertTwoDecimal(totalFoodCost),
        foodTax: convertTwoDecimal(totalFoodCost * FOOD_TAX)
      },
      () => {
        //update total after food related costs have been set
        this.calculateTotalCost();
      }
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const buttons = ["$0", "$2", "$4", "$6"];
    const selectedTipBtnIndex = this.state.selectedTipBtnIndex;

    //cart isn't empty
    if (this.props.cart.items.length != 0) {
      return (
        <View style={styles.container}>
          <BuildingPicker
            deliveryLocation={this.state.deliveryLocation}
            clickHandler={this.handleBuildingSelection}
          />

          <View style={styles.listView}>
            <FlatList
              data={this.props.cart.items}
              renderItem={({ item }) => <OrderMenuItem menuItem={item} />}
              keyExtractor={(item, index) => index.toString()}
            />

            <Input
              onChangeText={this.handlerInstructionsTextBox}
              placeholder="Special instructions? Room #?"
              leftIcon={{ type: "font-awesome", name: "chevron-right" }}
            />
          </View>

          <View>
            <ButtonGroup
              onPress={this.tipBtnGroupHandler}
              selectedIndex={selectedTipBtnIndex}
              buttons={buttons}
              containerStyle={{ height: 50, margin: 20 }}
            />
          </View>

          <View style={styles.costContainer}>
            <Text style={styles.costHeading}>Costs</Text>
            <View>
              <Text>Food: ${this.state.food}</Text>
              <Text>Delivery: ${this.state.delivery}</Text>
              <Text>Tips: ${this.state.tip}</Text>
              <Text>Food Tax: ${this.state.foodTax}</Text>
              <Text>Delivery Tax: ${this.state.deliveryTax}</Text>
              <Text style={styles.costTotal}>
                Total: ${this.state.totalCost}
              </Text>
            </View>
          </View>

          <View style={styles.buttonView}>
            <Button title="Place Order" onPress={this.handlePlaceOrder} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text h1 style={styles.textView}>
            Cart is Empty!
          </Text>
        </View>
      );
    }
  }
}

class BuildingPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      building: this.props.deliveryLocation
    };
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Your location: </Text>

        <Picker
          selectedValue={this.state.building}
          style={{ height: 50, width: 300 }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ building: itemValue });
            this.props.clickHandler(itemValue);
          }}
        >
          <Picker.Item label="CCT" value="CCT" />
          <Picker.Item
            label="Deerfield Hall (DH)"
            value="Deerfield Hall (DH)"
          />
          <Picker.Item label="Library (HM)" value="Library (HM)" />
          <Picker.Item label="Innovation Complex" value="Innovation Complex" />
          <Picker.Item
            label="Instructional Centre (IB)"
            value="Instructional Centre (IB)"
          />
          <Picker.Item label="Kaneff Centre (KN)" value="Kaneff Centre (KN)" />
          <Picker.Item label="North Building" value="North Building" />
          <Picker.Item label="Davis Building" value="Davis Building" />

          <Picker.Item label="Academic Annex" value="Academic Annex" />
          <Picker.Item label="Crime Scene House" value="Crime Scene House" />
          <Picker.Item
            label="Erindale Studio Theatre"
            value="Erindale Studio Theatre"
          />
          <Picker.Item
            label="Geomorphology Laboratory"
            value="Geomorphology Laboratory"
          />
          <Picker.Item label="Paleomagnetism Lab" value="Paleomagnetism Lab" />
          <Picker.Item
            label="Research Greenhouse"
            value="Research Greenhouse"
          />
          <Picker.Item
            label="Terrence Donnelly Health Sciences Complex"
            value="Terrence Donnelly Health Sciences Complex"
          />
        </Picker>
      </View>
    );
  }
}

const convertTwoDecimal = num => Math.floor(num * 100) / 100;

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(
  mapStateToProps,
  { resetCart }
)(CartScreen);

const styles = StyleSheet.create({
  costTotal: {
    fontSize: 14,
    fontWeight: "bold"
  },
  costHeading: {
    marginTop: 4,
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: "center"
  },
  costContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8
  },

  container: {
    flex: 1
  },

  listView: {
    flex: 10
  },

  buttonView: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end"
  },

  textView: {
    flex: 5,
    fontSize: 16,
    marginLeft: 20,
    textAlign: "left"
  },

  tipView: {
    flex: 1,
    textAlign: "center"
  }
});
