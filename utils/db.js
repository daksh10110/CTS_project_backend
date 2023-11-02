const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database");

        await sequelize.sync();
        console.log("Models synchronized");
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    }
};

module.exports = { connectToDatabase, sequelize };
