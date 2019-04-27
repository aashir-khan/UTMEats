const user = require("../models/user");
const order = require("../models/order");
const restaurants = require("../models/restaurants");
const payment = require("../models/payment");
const stripe = require("../libs/stripe-lib");

exports.getOrder = async function(req, res) {
  const orderId = req.query.orderId;
  const orderAcquired = await order.getOrder(orderId);
  if (!orderAcquired) {
    res.sendStatus(404);
    return;
  }
  res.send(JSON.stringify(orderAcquired));
};

exports.getCustomerOrders = async function(req, res) {
  const userId = req.query.userId;
  const orders = await order.getCustomerOrders(userId);

  const active = [];
  const completed = [];

  for (let order of orders) {
    const formattedOrder = await formatOrder(order);
    order.status === "completed"
      ? completed.push(formattedOrder)
      : active.push(formattedOrder);
  }

  res.send(
    JSON.stringify({
      active: active,
      completed: completed
    })
  );
};

exports.getAllReceivedOrders = async function(req, res) {
  const receivedOrders = await order.getAllReceivedOrders();
  if (!receivedOrders) {
    res.sendStatus(500);
    return;
  }

  res.send(
    JSON.stringify({
      receivedOrders: receivedOrders
    })
  );
};

exports.calculateCosts = async function(req, res) {
  const items = JSON.parse(req.query.items);

  let foodPrice = 0;
  for (let food of items) {
    const otherPricesSum = food.otherPrices.reduce(
      (partialSum, price) => partialSum + price
    );
    foodPrice += (food.basePrice + otherPricesSum) * food.quantity;
  }

  const foodTax = foodPrice * 0.13;
  const deliveryPrice = 2;
  const deliveryTax = deliveryPrice * 0.13;
  const totalPrice = foodPrice + foodTax + deliveryPrice + deliveryTax;

  const convertTwoDecimal = num => Math.floor(num * 100) / 100;

  res.send(
    JSON.stringify({
      costs: {
        food: convertTwoDecimal(foodPrice),
        foodTax: convertTwoDecimal(foodTax),
        delivery: convertTwoDecimal(deliveryPrice),
        deliveryTax: convertTwoDecimal(deliveryTax),
        total: convertTwoDecimal(totalPrice)
      }
    })
  );
};

exports.addOrder = async function(req, res) {
  const userId = req.body.userId;
  const restaurantId = req.body.restaurantId;
  const items = req.body.items;
  const costs = req.body.costs;
  const deliveryInstructions = req.body.deliveryInstructions;
  const deliveryLocation = req.body.deliveryLocation;

  const userInfo = await user.getUser(userId);

  if (!userInfo || !userInfo.customerId) {
    res.sendStatus(404);
    return;
  }

  // Get sum of all values in cost object
  const totalCost = Object.values(costs).reduce(
    (partialSum, price) => partialSum + price
  );

  const customerId = userInfo.customerId;  
  let cardId;
  
  try {
    const cardInfo = await payment.getCustomerCards(customerId);
    cardId = cardInfo.id;
  } catch (error) {
    res.sendStatus(404);
    return;
  }

  // Convert to cents
  const stripeCost = Math.round(totalCost * 100);
  const charge = await stripe.chargeCustomer(customerId, cardId, stripeCost);

  if (!charge) {
    res.sendStatus(500);
    return;
  }

  const newOrder = await order.addOrder(
    userId,
    restaurantId,
    items,
    costs,
    deliveryInstructions,
    deliveryLocation
  );

  if (!newOrder) {
    res.sendStatus(500);
    return;
  }

  res.sendStatus(200);
};

exports.acceptOrder = async function(req, res) {
  const orderId = req.body.orderId;
  const carrierId = req.body.carrierId;

  const userInfo = await user.getUser(carrierId);

  if (!userInfo) {
    res.sendStatus(404);
    return;
  }

  const email = userInfo.email;

  // If the connectedId is not in the DB, call createConnectedAccount
  const connectedId =
    userInfo.connectedId || (await createConnectedAccount(carrierId, email));

  // If createConnectedAccount failed
  if (!connectedId) {
    res.sendStatus(500);
    return;
  }

  const acceptOrderStatus = await order.acceptOrder(orderId, carrierId);

  if (!acceptOrderStatus) {
    res.sendStatus(500);
    return;
  }

  // As the first payment takes 7 business days to process, we will mock the following
  // API call for the demo (approved by Ilir).

  // const transfer = await stripe.transferMoney(connectedId, amount);
  const transfer = require("../mock_data/StripeTransfer.json");

  if (!transfer) {
    res.sendStatus(500);
    return;
  }

  res.sendStatus(200);
};

exports.updateOrderStatus = async function(req, res) {
  const orderId = req.body.orderId;
  const newStatus = req.body.newStatus;
  const ret = await order.updateOrderStatus(orderId, newStatus);
  if (!ret) {
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
};

exports.getCarrierEarnings = async function(req, res) {
  // Date library
  const moment = require("moment");
  const userId = req.query.userId;
  const orders = await order.getCarrierOrders(userId);
  const currDate = moment(Date.now());
  const daysInMonth = moment(currDate).daysInMonth();

  const weeklyEarnings = initializeEarnings([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]);
  const monthlyEarnings = initializeEarnings(
    [...Array(daysInMonth).keys()].map(x => x + 1)
  );
  const yearlyEarnings = initializeEarnings([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ]);

  const totalWeeklyEarnings = { delivery: 0, tip: 0 };
  const totalMonthlyEarnings = { delivery: 0, tip: 0 };
  const totalYearlyEarnings = { delivery: 0, tip: 0 };
  const allEarnings = { delivery: 0, tip: 0 };

  for (let order of orders) {
    const prices = getPrices(order);
    const orderDate = moment(order.createdAt);

    allEarnings.delivery += prices.delivery;
    allEarnings.tip += prices.tip;

    // Update yearly earnings
    if (currDate.isSame(orderDate, "year")) {
      const orderMonth = orderDate.format("MMM");
      yearlyEarnings[orderMonth] += prices.delivery + prices.tip;
      totalYearlyEarnings.delivery += prices.delivery;
      totalYearlyEarnings.tip += prices.tip;
    }

    // Update monthly earnings
    if (currDate.isSame(orderDate, "month")) {
      const orderDayOfMonth = orderDate.format("D");
      monthlyEarnings[orderDayOfMonth] = prices.delivery + prices.tip;
      totalMonthlyEarnings.delivery += prices.delivery;
      totalMonthlyEarnings.tip += prices.tip;
    }

    // Update weekly earnings
    if (currDate.isSame(orderDate, "week")) {
      const orderDayOfWeek = orderDate.format("ddd");
      weeklyEarnings[orderDayOfWeek] += prices.delivery + prices.tip;
      totalWeeklyEarnings.delivery += prices.delivery;
      totalWeeklyEarnings.tip += prices.tip;
    }
  }

  res.send(
    JSON.stringify({
      weeklyEarnings: convertToArray(weeklyEarnings),
      monthlyEarnings: convertToArray(monthlyEarnings),
      yearlyEarnings: convertToArray(yearlyEarnings),
      totalWeeklyEarnings,
      totalMonthlyEarnings,
      totalYearlyEarnings,
      allEarnings
    })
  );
};

exports.getOrderStatusEtaAndRating = async function(req, res) {
  const orderId = req.query.orderId;

  const orderResult = await order.getOrder(orderId); //get the associated order

  if (!orderResult) {
    res.sendStatus(404); // order not found
    return;
  }

  res.status(200); //everything went fine

  if (orderResult.review) {
    //some review exits
    // set the new status, eta
    res.send(
      JSON.stringify({
        newStatus: orderResult.status,
        newETA: orderResult.ETA,
        orderRating: orderResult.review.rating,
        carrierId: orderResult.carrierId
      })
    );
  } else {
    // set the new status, eta
    res.send(
      JSON.stringify({
        newStatus: orderResult.status,
        newETA: orderResult.ETA,
        carrierId: orderResult.carrierId
      })
    );
  }
};

exports.getCarrierName = async function(req, res) {
  const orderId = req.query.orderId;

  const orderResult = await order.getOrder(orderId); //get the associated order

  if (!orderResult) {
    res.sendStatus(404); // order not found
    return;
  }

  const nameResult = await user.getUser(orderResult.carrierId); //get the associated carrier

  if (!nameResult) {
    res.sendStatus(404); // carrier not found
    return;
  }

  res.status(200); //everything went fine

  // set the new status, eta
  res.send(
    JSON.stringify({
      firstName: nameResult.firstName,
      lastName: nameResult.lastName
    })
  );
};

exports.addReview = async function(req, res) {
  const orderId = req.body.orderId;
  const givenRating = req.body.rating;
  const comments = req.body.comments;

  const data = { comments: comments, rating: givenRating };
  const orderResult = await order.addReview(orderId, data); //set the rating in the order document
  if (!orderResult) {
    res.sendStatus(404); // order not found
    return;
  }

  //get carrier id
  const getOrderResult = await order.getOrder(orderId); //set the rating in the order document
  if (!getOrderResult) {
    res.sendStatus(404); // order not found
    return;
  }

  const carrierId = getOrderResult.carrierId;

  const carrierResult = await user.getUser(carrierId); //get carrier's document
  if (!carrierResult) {
    res.sendStatus(404); // carrier not found
    return;
  }

  //carrier has no previous rating
  if (!carrierResult.rating) {
    //init the first review
    const updateUserRatingResult = await user.updateUser(carrierId, {
      rating: { totalRating: givenRating, totalReviews: 1 }
    });

    if (!updateUserRatingResult) {
      res.sendStatus(500); // couldn't update
      return;
    }
  } else {
    //carrier has previous ratings
    const previousRatingTotal = carrierResult.rating.totalRating;
    const previousTotalReviews = carrierResult.rating.totalReviews;

    //update carrier's rating
    const updateUserRatingResult = await user.updateUser(carrierId, {
      rating: {
        totalRating: givenRating + previousRatingTotal,
        totalReviews: previousTotalReviews + 1
      }
    });

    if (!updateUserRatingResult) {
      res.sendStatus(500); // couldn't update
      return;
    }
  }
  res.sendStatus(200); // everything went fine
};

// ---------------------- Helper functions ---------------------

async function formatOrder(order) {
  const restaurantId = order.restaurantId;
  const restaurant = await restaurants.getOneRestaurant(restaurantId);

  if (order.review) {
    // if the oder has been reviewed
    return {
      id: order.id,
      status: order.status,
      ETA: order.ETA,
      items: order.items,
      restaurant: {
        name: restaurant.name,
        thumbnail: restaurant.thumbnail
      },
      costs: order.costs,
      orderRating: order.review.rating
    };
  } else {
    return {
      id: order.id,
      status: order.status,
      ETA: order.ETA,
      items: order.items,
      restaurant: {
        name: restaurant.name,
        thumbnail: restaurant.thumbnail
      },
      costs: order.costs,
      orderRating: -1
    };
  }
}

function getPrices(order) {
  const tip = order.costs.tip || 0;

  return {
    delivery: order.costs.delivery,
    tip: tip
  };
}

function initializeEarnings(arr) {
  const earnings = {};

  for (i of arr) {
    earnings[i] = 0;
  }

  return earnings;
}

function convertToArray(obj) {
  const arr = [];
  for (let key in obj) arr.push({ x: key, y: obj[key] });
  return arr;
}

async function createConnectedAccount(userId, email) {
  // https://stripe.com/docs/connect/required-verification-information
  // https://stripe.com/docs/connect/identity-verification-api

  const connectedAccount = await stripe.createConnectedAccount(email);

  if (!connectedAccount) {
    return;
  }

  const connectedId = connectedAccount.id;

  // Update user in DB
  const userInfo = await user.updateUser(userId, { connectedId: connectedId });

  if (!userInfo) {
    return;
  } else {
    return connectedId;
  }
}
