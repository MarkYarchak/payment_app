const { User } = require('../models/User');

async function checkUserExists(username) {
  if (!username || username.length < 3) return { status: 400, data: 'username is required' };
  try {
    const dbUser = await User.findOne({ username });
    return { status: 200, data: !!dbUser };
  } catch (e) {
    return { status: 500, data: 'Something went wrong' };
  }
}

module.exports.checkUserExists = checkUserExists;
