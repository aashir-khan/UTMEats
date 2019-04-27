const restaurants = require("../models/restaurants");

exports.getAll = async function(req, res) {
  const data = await restaurants.getAllRestaurants();
  res.send(JSON.stringify(data));
};

exports.getOneRestaurant = async function(req, res) {
  const restaurantId = req.query.restaurantId;
  const data = await restaurants.getOneRestaurant(restaurantId);
  res.send(JSON.stringify(data));
};
