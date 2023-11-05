const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");
const { ulid } = require("ulid");
const Client = require("./Client")

class Log extends Model {}

Log.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: ulid,
        },
        loginTime: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
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
        modelName: "Log",
    },
);

Log.belongsTo(Client, { foreignKey: 'client_id' });

(async () => {
    try {
        await Log.sync({ alter: true });
        console.log("Log model is synced with the database");
    } catch (error) {
        console.error("Error syncing the Log model:", error);
    }
})();

module.exports = Log;