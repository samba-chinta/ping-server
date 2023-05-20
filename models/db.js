import { Sequelize } from "sequelize";

const postgresSequelize = new Sequelize('ping', 'siva-chinta', 'sivaChinta@123', {
    host: 'localhost',
    dialect: 'postgres'
});

postgresSequelize.authenticate()
.then((res) => {
    console.log("Connection established successfully!");
})
.catch((err) => {
    console.log("Unable to connect to the database: ", err);
})

export default postgresSequelize;