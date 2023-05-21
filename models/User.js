import { config } from "dotenv";
import { Sequelize, DataTypes } from "sequelize";

// import pgConnection
import pgConnection from "./db.js";

// configing the env
config();

const pgConnect = await pgConnection(process.env.PG_USERNAME, process.env.PG_PASSWORD); 

const User = pgConnect.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    MFAEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    MFASecret: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

await User.sync({
    alter: true,
})

export default User;