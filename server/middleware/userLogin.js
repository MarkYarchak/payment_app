const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config.json');

const checkUserLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).send('Token required').end();
    const decodedToken = jwt.verify(token, jwtKey);
    const { username, password } = decodedToken;
    const dbUser = await User.findOne({ username });
    if (!dbUser) return res.status(400).send('Bad request').end();
    const comparedPassword = password === dbUser.password;
    if (comparedPassword) next();
    else return res.status(400).send('Invalid token').end();
  } catch (e) {
    return res.status(500).send('Something went wrong').end();
  }
};

module.exports.checkUserLogin = checkUserLogin;
