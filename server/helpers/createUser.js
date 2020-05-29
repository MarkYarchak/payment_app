const { User } = require('../models/User');
const { defaultUserPassword } = require('../config.json');

const createUser = async (userData) => {
  try {
    userData.password = userData.password || defaultUserPassword;
    const salt = bcrypt.genSaltSync(12);
    userData.password = bcrypt.hashSync(userData.password, salt);
    const newUser = new User(userData);
    await newUser.save();
    return { ...newUser };
  } catch (e) {
    return false;
  }
};

module.exports.createUser = createUser;
