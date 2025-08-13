const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../data-access/userModel');
const { toUserDto } = require('../dto/userDto');
const { assertNotSuperAdmin } = require('./userHelpers');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

async function registerUser({ name, email, password, role }) {
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required');
  }

  assertNotSuperAdmin(role, 'create superadmin');

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  const user = await User.create({ name, email, passwordHash, role });
  return toUserDto(user);
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { token, user: toUserDto(user) };
}

// function for future private/internal use
async function createUser({ name, email, password, role }) {
  // Reuse registerUser logic
  return registerUser({ name, email, password, role });
}

async function updateUser(id, data) {
  if (!id) {
    throw new Error('User ID is required');
  }

  assertNotSuperAdmin(data.role, 'assign superadmin role');

  // Whitelist updatable fields
  const allowedUpdates = ['name', 'email', 'role'];
  const filteredData = {};
  for (const key of allowedUpdates) {
    if (data[key] !== undefined) filteredData[key] = data[key];
  }

  const user = await User.findByIdAndUpdate(id, filteredData, { new: true });
  if (!user) {
    throw new Error('User not found');
  }
  return toUserDto(user);
}

async function getAllUsers() {
  const users = await User.find();
  return users.map(toUserDto);
}

module.exports = {
  registerUser,
  loginUser,
  createUser,
  updateUser,
  getAllUsers,
};
