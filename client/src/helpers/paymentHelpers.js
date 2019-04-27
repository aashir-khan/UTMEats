import axios from 'axios';

exports.addCustomerCardBackend = async function(userId, tokenId) {
  return await axios.post('https://utmeats.herokuapp.com/payment/addCustomerCard', {
    userId: userId,
    tokenId: tokenId
  });
};

exports.removeCustomerBackend = async function(userId) {
  return await axios.delete('https://utmeats.herokuapp.com/payment/deleteCustomer', {
    data: { userId: userId }
  });
};

exports.verifyIsCustomerBackend = async function(userId) {
  return await axios.get(
    `http://utmeats.herokuapp.com/payment/verifyIsCustomer?userId=${JSON.stringify(userId)}`
  );
};
