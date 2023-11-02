const express = require('express');
const router = express.Router();
const Client= require('../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config')

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phoneNumber, age } = req.body;
    const ip = req.ip;
    const mac = 'random-mac-address';

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newClient = await Client.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      age,
      ip,
      mac,
      accountCreatedDate: new Date(),
      loginTime: null,
      logoutTime: null,
    });

    res.status(201).json({ message: 'Signup successful', client: newClient });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

router.post('/login', async (req, res) => {
	try {
	  const { email, password } = req.body;
  
	  const client = await Client.findOne({ where: { email } });
  
	  if (client && bcrypt.compareSync(password, client.password)) {
		if (client.loginTime && client.logoutTime) {
		  client.loginTime = new Date();
		  client.logoutTime = null;
		} else {
		  client.loginTime = new Date();
		}
  
		client.ip = req.ip;
		await client.save();
  
		const token = jwt.sign({ id: client.id }, SECRET, { expiresIn: '11h' });
  
		res.status(200).json({ message: 'Login successful', token });
	  } else {
		res.status(401).json({ message: 'Invalid credentials' });
	  }
	} catch (error) {
	  res.status(500).json({ message: 'An error occurred', error: error.message });
	}
});

module.exports = router;