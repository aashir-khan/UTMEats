const user = require("../models/user");
const payment = require("../models/payment");

exports.addCustomerCard = async function(req, res) {
  const userId = req.body.userId;
  const tokenId = req.body.tokenId;
  let userInfo = null;
  let isCustomer = null;

  try {
    userInfo = await user.getUser(userId);
    userInfo = { ...userInfo, ...{ userId: userId } };
  } catch (error) {
    res.sendStatus(404);
    return;
  }

  try {
    isCustomer = await payment.verifyIsCustomer({ userInfo: userInfo });
  } catch (error) {
    console.log;
  }

  if (!isCustomer) {
    try {
      payment.addCustomer(userInfo, tokenId);
      res.sendStatus(200);
      return;
    } catch (error) {
      res.sendStatus(500);
      return;
    }
  } else {
    try {
      payment.updateCustomerSource(userInfo.customerId, tokenId);
      res.sendStatus(200);
      return;
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
  }
};

exports.deleteCustomer = async function(req, res) {
  const userId = req.body.userId;
  try {
    deleteCustomerResult = await payment.deleteCustomer(userId);
    if (!deleteCustomerResult) {
      res.sendStatus(404);
      return;
    }
  } catch (error) {
    res.sendStatus(500);
    return;
  }

  res.sendStatus(200);
};

exports.verifyIsCustomer = async function(req, res) {
  const userId = req.query.userId;

  try {
    const isCustomer = await payment.verifyIsCustomer({ userId: userId });

    if (isCustomer) {
      res.send(JSON.stringify({ isCustomer: true }));
    } else {
      res.send(JSON.stringify({ isCustomer: false }));
    }
  } catch (error) {
    res.sendStatus(500);
    return;
  }
};

exports.getCustomerCards = async function(req, res) {
  const userId = req.query.userId;
  const userInfo = await user.getUser(userId);

  try {
    const customerCard = await payment.getCustomerCards(userInfo.customerId);
    res.send(JSON.stringify({ card: customerCard }));
    return;
  } catch (error) {
    res.sendStatus(500);
    return;
  }
};
