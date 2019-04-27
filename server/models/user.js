const firebase = require("../libs/firebase-lib");

exports.getUser = async function(userId) {
  return await firebase.get("users", userId);
};

exports.updateUser = async function(userId, info) {
  return await firebase.update('users', userId, info);
}

exports.addUserDetails = async function(userId, data) {
  return await firebase.set('users', userId, data);
};
