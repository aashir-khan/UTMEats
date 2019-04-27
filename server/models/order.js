const firebase = require("../libs/firebase-lib");
const restaurants = require("../models/restaurants");

exports.getOrder = async function(orderId) {
  return await firebase.get("orders", orderId);
};

exports.getCustomerOrders = async function(userId) {
  // Find all orders by the user sorted by createdAt
  const orders = await firebase.query(
    "orders",
    "customerId",
    "==",
    userId,
    "createdAt"
  );
  const ordersData = [];

  orders.forEach(order => {
    ordersData.push({
      ...order.data(),
      id: order.id
    });
  });
  return ordersData;
};

exports.getCarrierOrders = async function(userId) {
  // Find all orders by the user sorted by createdAt
  const orders = await firebase.query(
    "orders",
    "carrierId",
    "==",
    userId,
    "createdAt"
  );

  const ordersData = [];

  orders.forEach(order => {
    ordersData.push({
      ...order.data(),
      id: order.id
    });
  });
  return ordersData;
};

exports.getAllReceivedOrders = async function() {
  try {
    const querySnapshot = await firebase.query(
      "orders",
      "status",
      "==",
      "received"
    );
    const receivedOrders = querySnapshot.docs.map(receivedOrder =>
      receivedOrder.data()
    );

    let index = 0;

    for (let currentReceivedOrder of receivedOrders) {
      const currentOrderRestaurantDetails = await restaurants.getOneRestaurant(
        currentReceivedOrder.restaurantId
      );

      currentReceivedOrder = {
        ...currentReceivedOrder,
        ...{ restaurantName: currentOrderRestaurantDetails.name }
      };
      receivedOrders[index] = currentReceivedOrder;
      index += 1;
    }

    return receivedOrders;
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.addOrder = async function(
  userId,
  restaurantId,
  items,
  costs,
  deliveryInstructions,
  deliveryLocation
) {
  const info = {
    restaurantId: restaurantId,
    customerId: userId,
    status: "received",
    items: items,
    costs: costs,
    deliveryInstructions: deliveryInstructions,
    deliveryLocation: deliveryLocation,
    createdAt: Date.now(),
    ETA: ""
  };

  return await firebase.set("orders", null, info);
};

exports.acceptOrder = async function(orderId, carrierId) {
  await firebase.update("orders", orderId, { carrierId: carrierId });
  return await this.updateOrderStatus(orderId, "accepted");
};

exports.updateOrderStatus = async function(orderId, newStatus) {
  const oldOrderDetails = await this.getOrder(orderId);
  let newOrderETA = null;
  if (newStatus == "accepted") {
    newOrderETA = "30 minutes";
  } else if (newStatus == "at restaurant") {
    newOrderETA = "23 minutes";
  } else if (newStatus == "picked up food") {
    newOrderETA = "15 minutes";
  } else if (newStatus == "picked up food" || newStatus == "on way customer") {
    newOrderETA = "7 minutes";
  } else if (newStatus == "completed") {
    newOrderETA = "0 minutes";
  }
  return await firebase.update("orders", orderId, {
    status: newStatus,
    ETA: newOrderETA
  });
};

exports.addReview = async function(orderId, data) {
  return await firebase.update("orders", orderId, { review: data });
};
