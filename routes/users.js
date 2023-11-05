const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Client = require("../models/Client");
const { SECRET } = require("../utils/config");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
    const token = req.token;
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.id;

    const user = await Client.findByPk(userId, {
        attributes: { exclude: ["password", "isAdmin"] },
    });

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "Client not found" });
    }
});

module.exports = router;
