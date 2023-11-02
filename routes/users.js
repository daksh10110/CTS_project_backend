const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/Client');
const { SECRET } = require('../utils/config');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'ip', 'mac', 'age', 'loginTime', 'logoutTime']
  });
  res.json(users);
});

router.get('/me', async (req, res) => {
  const token = req.token
  const decoded = jwt.verify(token, SECRET);
  const userId = decoded.id;

  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password', 'logoutTime'] }
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }

})

module.exports = router;
