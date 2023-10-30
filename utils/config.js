require("dotenv").config()

let PORT = process.env.PORT || 3000
let DATABASE_URL = process.env.DATABASE_URL

module.exports = {
	DATABASE_URL,
	PORT
}