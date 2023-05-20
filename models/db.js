import { Sequelize } from "sequelize";

const pgConnection = async (username, password) => {
    const postgresSequelize = new Sequelize("postgres", username, password, {
        host: "localhost",
        dialect: "postgres",
    });

    return postgresSequelize;
};

export default pgConnection;
