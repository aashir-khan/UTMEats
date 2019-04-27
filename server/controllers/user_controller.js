const user = require("../models/user");

exports.verify = function(req, res) {
  res.send(JSON.stringify({ Hello: "World" }));
};

exports.onRegisterAddDetails = function(req, res) {
  const { firstName, lastName, email, dateOfBirth, phoneNumber } = req.body;

  const data = {
    firstName :firstName , 
    lastName :lastName, 
    email :email, 
    phoneNumber: phoneNumber,
    dateOfBirth :dateOfBirth
  }

  const result = user.addUserDetails(req.body.userId, data);

  if (!result) {
    res.sendStatus(500); //internal error
  } else {
    res.sendStatus(200);
  }
};

exports.getUser = async function(req, res) {
  const userId = req.query.userId;
  const allUserDetails = await user.getUser(userId);
  if (!allUserDetails) {
    res.sendStatus(404); //user not found
    return;
  } 
  res.status(200); //everything went fine

  res.send(JSON.stringify(allUserDetails));
};

exports.updateUser = async function(req, res) {
  const userId = req.body.userId;
  const {firstName, lastName, phoneNumber, dateOfBirth } = req.body;

  //the data we want to update
  const data = {
    firstName :firstName , 
    lastName :lastName, 
    dateOfBirth: dateOfBirth,
    phoneNumber :phoneNumber
  }

  const allUserDetails = await user.updateUser(userId, data);

  if (!allUserDetails) {
    res.sendStatus(500);
    return;
  } else {
    res.sendStatus(200);
  }
};
