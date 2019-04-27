const express = require("express");
const bodyParser = require("body-parser");

const userController = require("./controllers/user_controller");
const paymentController = require("./controllers/payment_controller");
const restaurantsController = require("./controllers/restaurants_controller");
const orderController = require("./controllers/order_controller");

const orderMock = require("./mock_data/order_mock");
const restaurantMock = require("./mock_data/restaurants/restaurant-mock");

const port = process.env.PORT || 3000;
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

// Users
// app.get('/user/verify', userController.verify);
app.get("/user/getUser", userController.getUser);
app.post("/user/updateUser", userController.updateUser);
app.post("/user/onRegisterAddDetails", userController.onRegisterAddDetails);

// Payment
app.post("/payment/addCustomerCard", paymentController.addCustomerCard);
app.delete("/payment/deleteCustomer", paymentController.deleteCustomer);
app.get("/payment/verifyIsCustomer", paymentController.verifyIsCustomer);
app.get("/payment/getCustomerCards", paymentController.getCustomerCards);

// Restaurants
app.get("/restaurants/getAll", restaurantsController.getAll);
app.get(
  "/restaurants/getOneRestaurant",
  restaurantsController.getOneRestaurant
);
app.post(
  "/restaurants/createMockRestaurants",
  restaurantMock.createMockRestaurantsController
);

// Orders
app.get("/order/getCustomerOrders", orderController.getCustomerOrders);
app.get("/order/getAllReceivedOrders", orderController.getAllReceivedOrders);
app.get("/order/getOrder", orderController.getOrder);
app.get("/order/getCarrierEarnings", orderController.getCarrierEarnings);
app.get("/order/calculateCosts", orderController.calculateCosts);
app.get(
  "/order/getOrderStatusEtaAndRating",
  orderController.getOrderStatusEtaAndRating
);
app.get("/order/getCarrierName", orderController.getCarrierName);
app.put("/order/acceptOrder", orderController.acceptOrder);
app.put("/order/updateOrderStatus", orderController.updateOrderStatus);
app.post("/order/addOrder", orderController.addOrder);
app.post("/order/createMockOrders", orderMock.createMockOrdersController);
app.post("/order/addReview", orderController.addReview);

app.listen(port, function() {
  console.log("Listening on port " + port);
});
