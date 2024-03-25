import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });

export const env = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_TOKEN: process.env.CLIENT_TOKEN,

    URL: process.env.URL,

    DB_HOST: "mysql",
    DB_PORT: parseInt(process.env.DATABASE_PORT),
    DB_USER: "levels",
    DB_PASSWORD: process.env.DATABASE_PASSWORD,
    DB_DATABASE: "levels",

    KEY: process.env.KEY,
}