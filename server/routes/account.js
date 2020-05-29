const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config.json');
const { checkUserExists } = require('../helpers/userExists');
const { createUser } = require('../helpers/createUser');

router.post('/register', async (req, res) => {
  const userData = { username, password } = req.body;
  if (userData.password.length < 8) return res.status(400).send('Short password, required 8 or more symbols').end();
  const newUser = await createUser(userData);
  if (!newUser) res.status(500).send('Something went wrong').end();
  res.send(newUser).end();

});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const dbUser = await User.findOne({ username: username });
    if (!dbUser) return res.status(404).send('User is not registered').end();
    const comparedPass = bcrypt.compareSync(password, dbUser.password);
    if (comparedPass) {
      const signedToken = jwt.sign({ username, password: dbUser.password }, jwtKey);
      res.status(200).send({ ...dbUser, signedToken }).end();
    } else return res.status(400).send('Passwords do not match').end();
  } catch (e) {
    return res.status(500).send('Something went wrong').end();
  }
});

router.post('/exists', async (req, res) => {
  try {
    const { username } = req.body;
    const existsResponse = await checkUserExists(username);
    const { status, data } = existsResponse;
    res.status(status).send(data).end();
  } catch (e) {
    return res.status(500).send('Something went wrong.').end();
  }
});


module.exports = router;
