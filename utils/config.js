require("dotenv").config();

let PORT = process.env.PORT || 3000;
let DATABASE_URL = process.env.DATABASE_URL;
let SECRET = process.env.SECRET;

module.exports = {
    DATABASE_URL,
    PORT,
    SECRET,
};
