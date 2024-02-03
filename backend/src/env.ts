import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });

export const env = {
    DB_HOST: "mysql",
    DB_PORT: parseInt(process.env.DATABASE_PORT),
    DB_USER: "levels",
    DB_PASSWORD: process.env.DATABASE_PASSWORD,
    DB_DATABASE: "levels"
}