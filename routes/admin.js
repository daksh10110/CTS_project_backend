const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const Log = require("../models/Log");
const { SECRET } = require("../utils/config");
const { Op } = require("sequelize");

router.get("/active", async (req, res) => {
    condition = {
        loginTime: {
            [Op.not]: null,
        },
    };

    const users = await Client.findAll({
        attributes: ["id", "ip", "mac", "age", "loginTime"],
        where: condition,
    });

    res.json(users);
});

router.get("/history", async (req, res) => {
    const logs = await Log.findAll({
        include: {
            model: Client,
            attributes: ["id", "ip", "mac", "age"],
        },
        attributes: {
            exclude: ["client_id", "id"],
        },
    });

    res.json(logs);
});


module.exports = router;