import { DataTypes } from "sequelize";

// import sequelize postgres db
import postgresSequelize from "./db.js";

// Importing User & Contact models
import User from "./User.js";
import Contact from "./Contact.js";

const Message = postgresSequelize.define('Message', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    },
});

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' });
Contact.hasMany(Message, { foreignKey: 'contactId' });
Message.belongsTo(Contact, { foreignKey: 'contactId' });

export default Message;