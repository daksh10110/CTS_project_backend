const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");
const { ulid } = require('ulid');

class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.STRING,
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
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountCreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mac: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    logoutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "Client",
  }
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
