import { DataTypes } from "sequelize";

// import sequelize postgres db
import postgresSequelize from "./db.js";

const User = postgresSequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
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