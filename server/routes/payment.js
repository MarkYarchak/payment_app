const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { checkUserExists } = require('../helpers/userExists');
const { checkUserLogin } = require('../middleware/userLogin');
const { createUser } = require('../helpers/createUser');

router.use(checkUserLogin);

router.post('/make', async (req, res) => {
  const { receiverUsername, price, token } = req.body;
  if (!receiverUsername) return res.status(400).send('Receiver data required').end();
  const priceValue = transformPrice(price);
  if (!price || !price <= 0 || Object.is(priceValue, NaN)) return res.status(400).send('Invalid price').end();

  const decodedToken = jwt.decode(token);
  if (decodedToken.username === receiverUsername) return res.status(400).send('You can\'t send yourself money').end();
  const { status, data: existsUser } = await checkUserExists(receiverUsername);
  if (status === 200) {
    try {
      // set receiver user
      let receiver;
      if (!existsUser) receiver = await createUser({ username: receiverUsername });
      else receiver = await User.findOne({ username: receiverUsername });

      // change receiver balance
      const newReceiverBalance = receiver.balance + priceValue;
      await User.updateOne({ username: receiver.username }, { balance: newReceiverBalance });

      // change current token user balance
      const tokenUser = await User.findOne({ username: decodedToken.username });
      const newTokenUserBalance = receiver.balance - priceValue;
      await User.updateOne({ username: tokenUser.username }, { balance: newTokenUserBalance });

      // update payment operations
      const completedPaymentOperation = {
        receiver: receiver.username,
        payer: tokenUser.username,
        price: priceValue,
        date: new Date(),
      };
      await User.updateMany(
        { $or: [{ username: tokenUser.username }, { username: receiver.username }] },
        { $push: { paymentOperations: completedPaymentOperation } }
      );

      return res.status(200).send('Payment successfully completed').end();
    } catch (e) {
      return res.status(500).send('Sorry, something went wrong').end();
    }
  } else return res.status(status).send(existsUser).end();
});

function transformPrice(price) {
  return Math.round((parseFloat(price) + Number.EPSILON) * 100) / 100
}

module.exports = router;
