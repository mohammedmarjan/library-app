const express = require('express');
const wrapRouter = require('../../../../utils/wrapRouter');

const { createUser, getAllUsers } = require('../../domain/userService');

const baseRouter = express.Router();
const router = wrapRouter(baseRouter);

router.post('/', async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
});

router.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

module.exports = router;
