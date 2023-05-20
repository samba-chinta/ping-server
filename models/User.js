import { Sequelize, DataTypes } from "sequelize";

// import pgConnection
import pgConnection from "./db.js";

const pgConnect = await pgConnection("postgres", "sivaChinta@123"); 

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
    }
});

export default User;