const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const arp = require("@network-utils/arp-lookup");

const extractIPv4 = (ipAddress) => {
    const parts = ipAddress.split(':');
    const ipv4 = parts[parts.length - 1];
  
    const validIPv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (validIPv4Regex.test(ipv4)) {
        return ipv4;
    } else {
        return null;
    }
};

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, phoneNumber, age } = req.body;
        const ip = extractIPv4(req.ip);
        const mac = await arp.toMAC(ip);

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

        res.status(201).json({
            message: "Signup successful",
            client: newClient,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message,
        });
    }
});

router.post("/login", async (req, res) => {
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

            client.ip = extractIPv4(req.ip);
            client.mac = await arp.toMAC(client.ip);
            await client.save();

            const token = jwt.sign({ id: client.id }, SECRET, {
                expiresIn: "11h",
            });

            res.status(200).json({ message: "Login successful", token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message,
        });
    }
});

router.post("/logout", async (req, res) => {
    const authorization = req.get("authorization");

    if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
        return res.status(401).json({ message: "Token not found" });
    }

    const token = authorization.substring(7);

    try {
        const decoded = jwt.verify(token, SECRET);
        const userId = decoded.id;

        const client = await Client.findByPk(userId);

        if (client) {
            if (!client.logoutTime) {
                client.logoutTime = new Date();
                await client.save();
                return res.status(200).json({ message: "Logout successful" });
            } else {
                return res.status(401).json({ message: "Logout Failed" });
            }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
});

module.exports = router;
