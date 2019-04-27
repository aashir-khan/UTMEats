const firebase = require("../libs/firebase-lib");

exports.getAllRestaurants = async function() {
  const restaurantsQuery = await firebase.query(
    "restaurants",
    null,
    null,
    null,
    "name"
  );
  let restaurantsData = [];
  restaurantsQuery.forEach(restaurant => {
    restaurantsData.push(restaurant.data());
  });

  return restaurantsData;
};

exports.getOneRestaurant = async function(restaurantId) {
  return await firebase.get("restaurants", restaurantId);
};
