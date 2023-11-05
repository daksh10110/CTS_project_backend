const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");
const { ulid } = require("ulid");

class Client extends Model {}

Client.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: ulid,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        job: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        accountCreatedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mac: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loginTime: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: "Client",
    },
);

// Synchronize the model with the database (Creates the table if it doesn't exist)
(async () => {
    try {
        await Client.sync({ alter: true });
        console.log("Client model is synced with the database");
    } catch (error) {
        console.error("Error syncing the Client model:", error);
    }
})();

module.exports = Client;
