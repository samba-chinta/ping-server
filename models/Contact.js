import { DataTypes } from "sequelize";

// importing connection
import postgresSequelize from "./db.js";

// importing 'User' model to define the relation 
// with 'Contact' model.
import User from "./User.js";

const Contact = postgresSequelize.define('Contact', {
    userId: DataTypes.INTEGER,
    contactId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contactEmailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.hasMany(Contact, { foreignKey: 'userId' });
Contact.belongsTo(User, { foreignKey: 'userId' });

export default Contact;