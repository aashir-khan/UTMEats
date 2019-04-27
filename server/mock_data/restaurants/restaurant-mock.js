const firebase = require("../../libs/firebase-lib");

const pizzaPizza = require("./pizza-pizza");
const timHortons = require("./tim-hortons");
const subway = require("./subway");

exports.createMockRestaurantsController = async function(req, res) {
  const ret = await createMockRestaurants();
  if (!ret) {
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
};

createMockRestaurants = async function() {
  // exports.set = async function(collection, doc = null, info, idName = null) {

  await firebase.set(
    "restaurants",
    null,
    pizzaPizza.restaurant,
    "restaurantId"
  );

  await firebase.set(
    "restaurants",
    null,
    timHortons.restaurant,
    "restaurantId"
  );

  await firebase.set("restaurants", null, subway.restaurant, "restaurantId");

  return true;
};
