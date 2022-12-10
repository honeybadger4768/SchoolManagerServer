import mysql2 from "mysql2"
import dotenv from "dotenv";
dotenv.config()
const db = mysql2.createPool({
    host: "localhost",
    database: "SchoolManager",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    charset: "utf8mb4"
}).promise()

export {
    db
}
