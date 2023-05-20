import { DataTypes } from "sequelize";

// import pgConnection
import pgConnection from "./db.js";

// importing 'User' model to define the relation
// with 'Contact' model.
import User from "./User.js";

const pgConnect = await pgConnection();

const Contact = pgConnect.define("Contact", {
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

User.hasMany(Contact, { foreignKey: "userId" });
Contact.belongsTo(User, { foreignKey: "userId" });

export default Contact;
