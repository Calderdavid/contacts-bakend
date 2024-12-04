import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = new Sequelize(
    process.env.DB_NAME || "contacts",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "david2850",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false,
    }
);

export default dbConnection;