import { DataTypes } from "sequelize";
import { config } from "dotenv";

// import pgConnection
import pgConnection from "./db.js";

// configuring environment variables
config();

// importing 'User' model to define the relation
// with 'Contact' model.
import User from "./User.js";

const pgConnect = await pgConnection(process.env.PG_USERNAME, process.env.PG_PASSWORD);

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

// create table if not exists or
// alter table if any new modifications
// are done to Contact model
await Contact.sync({
    alter: true,
})

User.hasMany(Contact, { foreignKey: "userId" });
Contact.belongsTo(User, { foreignKey: "userId" });

export default Contact;
