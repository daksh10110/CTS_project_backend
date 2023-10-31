const express = require('express');
const router = express.Router();
const { Client } = require('../models/Client');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Assuming you have a function to authenticate the client
    const authenticatedClient = await authenticateClient(username, password);

    if (authenticatedClient) {
      // Update client's IP address
      authenticatedClient.ip = req.ip;
      // Set login time
      authenticatedClient.loginTime = new Date();
      await authenticatedClient.save();

      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// Logout route
router.post('/logout', async (req, res) => {
  try {
    // Find the client in the database based on the session or client identifier
    const client = await Client.findByPk(req.client.id); // Adjust this as per your setup

    if (client) {
      // Set logout time
      client.logoutTime = new Date();
      await client.save();

      res.status(200).json({ message: 'Logout successful' });
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
