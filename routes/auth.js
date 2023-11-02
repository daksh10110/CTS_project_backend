const express = require('express');
const router = express.Router();
const Client= require('../models/Client');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phoneNumber, age } = req.body;
    const ip = req.ip; // Extracting the IP address from the request
    const mac = 'random-mac-address'; // Assigning a random MAC address for now

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

module.exports = router;
