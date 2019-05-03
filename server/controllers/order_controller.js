/**
 * BTW I think instead of controllers/order_controller.js it should be
 * controllers/order.js
 */

const User = require('../models/user'),
  Order = require('../models/order'),
  Restaurants = require('../models/restaurants'),
  Payment = require('../models/payment'),
  Stripe = require('../libs/stripe-lib');

const _ = require('lodash');

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.getOrder = async function(req, res) {
  const orderId = req.query.orderId;

  const order = await Order.getOrder(orderId);
  if (!order) res.sendStatus(404).end();

  res.json(order);
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.getCustomerOrders = async function(req, res) {
  const userId = req.query.userId;

  // What if customer doesnt exist? No sendStatus(404)?
  const orders = await Order.getCustomerOrders(userId);
  let [completed, active] = _.partition(orders, { status: 'completed' });

  // Send over formatted versions of completed and active
  res.json({
    active: active.map(order => await formatOrder(order)),
    completed: completed.map(order => await formatOrder(order))
  });
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.getAllReceivedOrders = async function(req, res) {
  const receivedOrders = await Order.getAllReceivedOrders();
  if (!receivedOrders) res.sendStatus(500).end();

  res.json({ receivedOrders: receivedOrders });
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.calculateCosts = async function(req, res) {
  const items = JSON.parse(req.query.items);

  let foodPrice = 0;
  for (let food of items) {
    foodPrice += (food.basePrice + _.sum(food.otherPrices)) * food.quantity;
  }

  const costs = {};
  costs.foodTax = foodPrice * 0.13;
  costs.deliveryPrice = 2;
  costs.deliveryTax = deliveryPrice * 0.13;
  costs.totalPrice = _.sum(_.values(costs));

  // Round to two decimal places
  costs = _.mapValues(costs, cost => _.round(cost, 2));

  res.json(costs);
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.addOrder = async function(req, res) {
  const order = req.body;

  // Wouldnt it make more sense for a user to have an id? Like user.id, instead
  // of user.customerId.
  const user = await User.getUser(order.userId);
  if (!user || !user.customerId) res.sendStatus(404).end(); // User not found

  const card = await Payment.getCustomerCards(customerId);
  if (!card.id) res.sendStatus(404).end(); // Customer not found

  const cost = _.sum(_.values(order.costs));
  cost = Math.round(cost * 100); // Convert to cents

  const charge = await Stripe.chargeCustomer(user.customerId, card.id, cost);
  if (!charge) res.sendStatus(500).end(); // Charge unsuccesful

  const newOrder = await Order.addOrder(order);
  if (!newOrder) res.sendStatus(500).end(); // Adding order unsuccesful

  res.sendStatus(200);
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.acceptOrder = async function(req, res) {
  const { orderId, carrierId } = req.body;

  const user = await User.getUser(carrierId);
  if (!userInfo) res.sendStatus(404).end(); // User not found

  // If the connectedId is not in the DB, call createConnectedAccount
  const connectedId = user.connectedId || (await createConnectedAccount(carrierId, user.email));
  if (!connectedId) res.sendStatus(500).end(); // CreateConnectedAccount failed

  const acceptOrderStatus = await Order.acceptOrder(orderId, carrierId);
  if (!acceptOrderStatus) res.sendStatus(500).end();

  // As the first payment takes 7 business days to process, we will mock the following
  // API call for the demo (approved by Ilir).
  const transfer = require('../mock_data/StripeTransfer.json');
  if (!transfer) res.sendStatus(500).end();

  res.sendStatus(200);
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.updateOrderStatus = async function(req, res) {
  const { orderId, newStatus } = req.body;
  const ret = await Order.updateOrderStatus(orderId, newStatus);
  if (!ret) res.sendStatus(500).end();

  res.sendStatus(200);
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.getCarrierEarnings = async function(req, res) {
  const moment = require('moment'); // Date library
  const userId = req.query.userId;
  const orders = await Order.getCarrierOrders(userId);
  const daysInMonth = moment().daysInMonth();

  const weeklyEarnings = earnings(moment.weekdaysShort());
  const monthlyEarnings = earnings([...Array(daysInMonth).keys()].map(x => x + 1));
  const yearlyEarnings = earnings(moment.monthsShort());

  const totalWeeklyEarnings = { delivery: 0, tip: 0 };
  const totalMonthlyEarnings = { delivery: 0, tip: 0 };
  const totalYearlyEarnings = { delivery: 0, tip: 0 };
  const allEarnings = { delivery: 0, tip: 0 };

  for (let order of orders) {
    // Update yearly earnings
    updateEarnings(order, 'year', yearlyEarnings, totalYearlyEarnings);

    // Update monthly earnings
    updateEarnings(order, 'month', monthlyEarnings, totalMonthlyEarnings);

    // Update weekly earnings
    updateEarnings(order, 'week', weeklyEarnings, totalWeeklyEarnings);

    // Update total earnings
    allEarnings.delivery += prices.delivery;
    allEarnings.tip += prices.tip;
  }

  res.json({
    weeklyEarnings: _.values(weeklyEarnings),
    monthlyEarnings: _.values(monthlyEarnings),
    yearlyEarnings: _.values(yearlyEarnings),
    totalWeeklyEarnings: totalWeeklyEarnings,
    totalMonthlyEarnings: totalMonthlyEarnings,
    totalYearlyEarnings: totalYearlyEarnings,
    allEarnings: allEarnings
  });
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.getOrderStatusEtaAndRating = async function(req, res) {
  const orderId = req.query.orderId;

  const order = await Order.getOrder(orderId); //get the associated order
  if (!order) res.sendStatus(404).end(); // order not found

  res.status(200); // everything went fine

  const newOrder = {
    newStatus: order.status,
    newETA: order.ETA,
    carrierId: order.carrierId
  };

  if (order.review) newOrder.orderRating = order.review.rating;

  res.json(newOrder);
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.getCarrierName = async function(req, res) {
  const orderId = req.query.orderId;

  const order = await Order.getOrder(orderId); // get the associated order
  if (!order) res.sendStatus(404).end(); // order not found

  const carrier = await User.getUser(orderResult.carrierId); // get the associated carrier
  if (!carrier) res.sendStatus(404).end(); // carrier not found

  res.status(200); //everything went fine

  // set the new status, eta
  res.json({
    firstName: carrier.firstName,
    lastName: carrier.lastName
  });
};

/**
 * [description]
 * @request [description]
 * @response [description]
 */
exports.addReview = async function(req, res) {
  const { orderId, givenRating, comments } = req.body;
  const data = { comments: comments, rating: givenRating };

  const review = await Order.addReview(orderId, data); //set the rating in the order document
  if (!review) res.sendStatus(404).end(); // order not found

  // get order
  const order = await Order.getOrder(orderId); // set the rating in the order document
  if (!order) res.sendStatus(404).end(); // order not found

  // get carrier
  const carrier = await User.getUser(order.carrierId); // get carrier's document
  if (!carrier) res.sendStatus(404).end(); // carrier not found

  let ratings = { totalRating: givenRating, totalReviews: 1 };

  // carrier has previous ratings
  if (carrier.rating) {
    ratings.totalRating += carrier.rating.totalRating;
    ratings.totalReviews += carrier.rating.totalReviews;
  }

  const updateUserRatingResult = await User.updateUser(carrierId, ratings);
  if (!updateUserRatingResult) res.sendStatus(500).end(); // couldn't update

  res.sendStatus(200); // everything went fine
};

// ---------------------- Helper functions ---------------------

/**
 * [formatOrder description]
 * @param  order [description]
 * @return       [description]
 */
async function formatOrder(order) {
  const restaurant = await Restaurants.getOneRestaurant(order.restaurantId);
  let formatted = { ...order };
  formatted.orderRating = order.review ? order.review.rating : -1;
  formatted.restaurant = {
    name: restaurant.name,
    thumbnail: restaurant.thumbnail
  };
  return formatted;
}

/**
 * Converts an array of dates to an object appropriate for graphing the earnings
 * @param  dates List of dates
 * @return Object with values {'x': date, 'y': 0}, where y is the earnings for that date
 */
function earnings(dates) {
  const earnings = {};
  dates.forEach(date => (earnings[date] = { x: date, y: 0 }));
  return earnings;
}

/**
 * [updateEarnings description]
 * @param  {[type]} order   [description]
 * @param  {[type]} type    [description]
 * @param  {[type]} current [description]
 * @param  {[type]} total   [description]
 * @return {[type]}         [description]
 */
function updateEarnings(order, type, current, total) {
  const format = { year: 'MMM', month: 'D', week: 'ddd' };
  const orderDate = moment(order.createdAt);

  const { delivery, tip } = order.costs;
  tip = tip || 0;

  if (moment().isSame(orderDate, type)) {
    const date = orderDate.format(format[type]);
    current[date].y += delivery + tip;
    total.delivery += delivery;
    total.tip += tip;
  }
}

/**
 * [createConnectedAccount description]
 * @param  {[type]} userId [description]
 * @param  {[type]} email  [description]
 * @return {[type]}        [description]
 */
async function createConnectedAccount(userId, email) {
  // https://Stripe.com/docs/connect/required-verification-information
  // https://Stripe.com/docs/connect/identity-verification-api

  const connectedAccount = await Stripe.createConnectedAccount(email);
  if (!connectedAccount) return;

  const connectedId = connectedAccount.id;

  // Update user in DB
  const user = await User.updateUser(userId, { connectedId: connectedId });
  return user ? connectedId : null;
}
