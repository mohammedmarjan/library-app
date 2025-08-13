// userApi.js
const express = require('express');
const wrapRouter = require('../../../../utils/wrapRouter');
const { ROLES } = require('../../shared/constants');

// Middlewares
const verifyJwtToken = require('../../../../middlewares/verifyJwtToken');
const authorizeByRole = require('../../../../middlewares/authorizeByRole');
const {
  blockSuperAdminRoleOnCreate,
  blockSuperAdminRoleOnUpdate,
} = require('../../middlewares/blockSuperAdminRole');

// Services
const {
  registerUser,
  loginUser,
  createUser,
  updateUser,
  getAllUsers,
} = require('../../domain/userService');

const baseRouter = express.Router();
const router = wrapRouter(baseRouter);

// Public registration
router.post('/register', async (req, res) => {
  const user = await registerUser(req.body);
  res.json(user);
});

// Public login
router.post('/login', async (req, res) => {
  const result = await loginUser(req.body);
  res.json(result);
});

// Admin/Librarian create user
router.post(
  '/',
  verifyJwtToken,
  authorizeByRole(ROLES.LIBRARIAN, ROLES.ADMIN),
  blockSuperAdminRoleOnCreate,
  async (req, res) => {
    const user = await createUser(req.body);
    res.json(user);
  }
);

// Update user (Admin/Librarian only)
router.put(
  '/:id',
  verifyJwtToken,
  authorizeByRole(ROLES.LIBRARIAN, ROLES.ADMIN),
  blockSuperAdminRoleOnUpdate,
  async (req, res) => {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  }
);

// Get all users (Admin/Librarian only)
router.get('/', verifyJwtToken, authorizeByRole(ROLES.LIBRARIAN, ROLES.ADMIN), async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

module.exports = router;
