import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Picker,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {
  Button,
  ButtonGroup,
  Input,
  ThemeProvider,
  Icon
} from "react-native-elements";
import firebase from "@firebase/app";
import { connect } from "react-redux";
import stripe from "tipsi-stripe";

import "@firebase/auth";
import axios from "axios";

import { resetCart } from "../actions";

import OrderMenuItem from "../components/OrderMenuItem";
import CostView from "../components/CostView";

import theme from "../theme/Theme";

const FOOD_TAX = 0.13;
const DELIVERY_TAX = 0.13;
const DELIVERY = 5;

export class CartScreen extends React.Component {
  static navigationOptions = {
    title: "Checkout",
    headerTitleStyle: theme.Header.headerTitleStyle,
    headerTintColor: theme.Header.headerTintColor,
    headerStyle: theme.Header.headerStyle
  };

  constructor(props) {
    super(props);
    this.state = {
      creditCardInfo: -1,
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

    const { navigate } = this.props.navigation;

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

        navigate("Orders", {});
      })
      .catch(error => {
        Alert.alert("Failed to place an order");
        navigate("Orders", {});
      });
  }

  handlerInstructionsTextBox = text => {
    this.setState({ deliveryInstructions: text });
  };

  handleBuildingSelection(buildingName) {
    this.setState({ deliveryLocation: buildingName });
  }

  getCardInfo() {
    axios
      .get(
        `https://utmeats.herokuapp.com/payment/getCustomerCards?userId=${
          this.userId
        }`
      )
      .then(response => {
        // if (!response.data.card) {
        //   this.setState({ creditCardInfo: -1 });
        //   return;
        // }

        this.setState({
          creditCardInfo: {
            brand: response.data.card.brand,
            last4: response.data.card.last4
          }
        });
      })
      .catch(error => {
        console.log("error getting card info ", error);
      });
  }

  handlerCreditCard = async () => {
    // try {
    //   // this brings up GUI
    //   const tokenObj = await stripe.paymentRequestWithCardForm();
    //   const tokenId = tokenObj.tokenId;
    //   const addCustomerCardResult = await addCustomerCardBackend(
    //     this.userId,
    //     tokenId
    //   );
    //   if (addCustomerCardResult.status === 200) {
    //     Alert.alert("Successfully added payment method");
    //     this.getCardInfo(); // get card info and set it in the state
    //   }
    // } catch (error) {
    //   // don't want to throw error message if user just wanted to cancel dialog box
    //   if (error.message != "Cancelled by user") {
    //     console.log(error);
    //     Alert.alert("There was an error adding the payment method");
    //   }
    // }
    const { navigate } = this.props.navigation;
    navigate("Payment", {});
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
  }
  componentDidMount() {
    stripe.setOptions({
      publishableKey: "pk_test_XP7GCtNPXxkITEn7KSxgPfo2"
    });

    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.getCardInfo(); // get card info and set it in the state

        this.calculateFoodCost();
      }
    );
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

  renderPayment() {
    //no credit card on file
    if (this.state.creditCardInfo == -1) {
      return (
        <TouchableOpacity onPress={this.handlerCreditCard}>
          <Text>Tap to add a Credit Card.</Text>
        </TouchableOpacity>
      );
    }
    //user has a credit card
    return (
      <Text>
        Paying with {this.state.creditCardInfo.brand} ****
        {this.state.creditCardInfo.last4}{" "}
      </Text>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const buttons = ["$0", "$2", "$4", "$6"];
    const selectedTipBtnIndex = this.state.selectedTipBtnIndex;

    //cart isn't empty
    if (this.props.cart.items.length != 0) {
      const cost = {
        food: this.state.food,
        delivery: this.state.delivery,
        foodTax: this.state.foodTax,
        deliveryTax: this.state.deliveryTax,
        tip: this.state.tip,
        total: this.state.totalCost
      };

      return (
        <ThemeProvider theme={theme}>
          <ScrollView>
            <View>
              <View style={{ marginTop: 0 }}>
                <BuildingPicker
                  deliveryLocation={this.state.deliveryLocation}
                  clickHandler={this.handleBuildingSelection}
                />
                <FlatList
                  data={this.props.cart.items}
                  renderItem={({ item }) => <OrderMenuItem menuItem={item} />}
                  keyExtractor={(item, index) => index.toString()}
                />

                <Button
                  title="Clear Cart"
                  type="clear"
                  icon={<Icon name="md-trash" color="#e74c3c" type="ionicon" />}
                  onPress={() => this.props.resetCart()}
                  buttonStyle={{
                    marginLeft: 120,
                    marginRight: 120,
                    padding: 5,
                    borderColor: "#ff9287",
                    borderWidth: 2
                  }}
                  titleStyle={{
                    color: "#e74c3c"
                  }}
                />

                <View style={{ margin: 10, marginTop: 50 }}>
                  <Input
                    onChangeText={this.handlerInstructionsTextBox}
                    placeholder="Delivery Instructions? Room #?"
                    leftIcon={{ type: "font-awesome", name: "chevron-right" }}
                  />

                  <View>
                    <ButtonGroup
                      onPress={this.tipBtnGroupHandler}
                      selectedIndex={selectedTipBtnIndex}
                      buttons={buttons}
                      containerStyle={{ height: 30, margin: 20 }}
                    />
                  </View>

                  {this.renderPayment()}

                  <CostView costDetails={cost} />

                  <View style={styles.buttonView}>
                    <Button
                      title="Place Order"
                      onPress={this.handlePlaceOrder}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </ThemeProvider>
      );
    } else {
      return (
        <View style={theme.container}>
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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 0,
          margin: 10
        }}
      >
        <Text>Your location: </Text>

        <Picker
          selectedValue={this.state.building}
          style={{ height: 50, width: 240 }}
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
  container: {
    flex: 1
  },

  listView: {
    flex: 10
  },

  buttonView: {
    flex: 1,
    padding: 0,
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
