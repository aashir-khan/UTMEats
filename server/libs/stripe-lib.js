let apiKey;

// Production
if (process.env.StripeKey) {
  apiKey = process.env.StripeKey;
  // Local Testing
} else {
  const keyObj = require("../api_keys/StripeKey.json");
  apiKey = keyObj.key;
}

const stripe = require("stripe")(apiKey);

exports.addCustomer = async function(tokenId, userInfo) {
  const email = userInfo.email;
  const phoneNumber = userInfo.phoneNumber;
  const name = `${userInfo.firstName} ${userInfo.lastName}`;

  try {
    return await stripe.customers.create({
      source: tokenId,
      email: email,
      metadata: { phoneNumber: phoneNumber, name: name }
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.deleteCustomer = async function(customerId) {
  return await stripe.customers.del(customerId);
};

exports.chargeCustomer = async function(customerId, cardId, amount) {
  try {
    return await stripe.charges.create({
      amount: amount,
      currency: "cad",
      customer: customerId,
      source: cardId
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.createConnectedAccount = async function(email) {
  try {
    return await stripe.accounts.create({
      type: "custom",
      country: "CA",
      email: email
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.transferMoney = async function(connectedId, amount) {
  try {
    return await stripe.transfers.create({
      amount: amount,
      currency: "cad",
      destination: connectedId
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.updateCustomerSource = async function(customerId, newTokenId) {
  try {
    return await stripe.customers.update(customerId, { source: newTokenId });
  } catch (error) {
    console.log(error);
    return;
  }
};

// exports.getCard = function(customer, cardId) {
// 	// https://stripe.com/docs/api/cards/retrieve

// 	return stripe.customers.retrieveCard(customer.id, cardId,
// 		(err, card) => {
//       if (err) {
//         return {};
//       } else {
//         return {
//           id: cardId,
//           exp_month: card.exp_month,
//           exp_year: card.exp_year,
//           last4: card.last4
//         };
//       }
// 		}
// 	);
// }

// exports.removeCard = function(customer, cardId) {
// 	// https://stripe.com/docs/api/cards/delete

// 	return stripe.customers.deleteCard(customer.id, cardId,
// 		(err, card) => {
//       if (err) {
//           return {};
//       } else {
//         return {
//           deleted: card.deleted
//         };
//       }
// 		}
// 	);
// }

exports.listCards = async function(customerId) {
  const result = await stripe.customers.listCards(customerId);
  return result.data;
};
