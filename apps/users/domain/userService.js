const User = require('../data-access/userModel');
const { toUserDto } = require('../dto/userDto');

async function createUser(data) {
  const user = await User.create(data);
  return toUserDto(user);
}

async function getAllUsers() {
  const users = await User.find();
  return users.map(toUserDto);
}

module.exports = { createUser, getAllUsers };
