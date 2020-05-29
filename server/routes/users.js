const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { checkUserLogin } = require('../middleware/userLogin');

router.use(checkUserLogin);

router.post('/get', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users).end();
  } catch (e) {
    return res.status(500).send('Something went wrong.').end();
  }
});

router.post('/get/:username', async (req, res) => {
  try {
    const { username } = req.params;
    if (username.length < 3) res.status(400).send('invalid username').end();
    await User.findOne({ username });
    res.status(200).send(username).end();
  } catch (e) {
    return res.status(500).send('Something went wrong.').end();
  }
});


module.exports = router;
