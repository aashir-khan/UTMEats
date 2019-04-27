const stripe = require("../libs/stripe-lib");
const firebase = require("../libs/firebase-lib");
const user = require("../models/user");

exports.addCustomer = async function(userInfo, tokenId) {
  // Create the customer in the Stripe API
  let stripeCustomer = null;
  try {
    stripeCustomer = await stripe.addCustomer(tokenId, userInfo);
  } catch (error) {
    throw "error creating customer";
  }

  const customerId = stripeCustomer.id;

  const customerInfo = {
    customerId: customerId
  };

  // Update user to have Stripe info
  const dbCustomer = await user.updateUser(userInfo.userId, customerInfo);

  if (!dbCustomer) {
    return;
  }
};

exports.updateCustomerSource = async function(customerId, newTokenId) {
  try {
    await stripe.updateCustomerSource(customerId, newTokenId);
  } catch (errror) {
    console.log(error);
    return;
  }
};

exports.deleteCustomer = async function(userId) {
  let userInfo = null;
  let isCustomer = null;
  let deleteCustomerResult = null;
  let firebaseRemoveCustomerIdResult = null;

  userInfo = await user.getUser(userId);
  isCustomer = await this.verifyIsCustomer({ userInfo: userInfo });
  if (!isCustomer) {
    return;
  }

  deleteCustomerResult = await stripe.deleteCustomer(userInfo.customerId);

  firebaseRemoveCustomerIdResult = await firebase.remove("users", userId, [
    "customerId"
  ]);
  return true;
};

exports.verifyIsCustomer = async function(userDetails) {
  if (userDetails.userInfo) {
    return userDetails.userInfo.hasOwnProperty("customerId");
  }
  if (userDetails.userId) {
    try {
      const userInfo = await user.getUser(userDetails.userId);
      return userInfo.hasOwnProperty("customerId");
    } catch (error) {
      throw "unable to get user details";
    }
  }
  throw "expecting either userInfo or userId, but given nothing or something else";
};

exports.getCustomerCards = async function(customerId) {
  const customerCards = await stripe.listCards(customerId);
  return customerCards[0]; // first card
};
