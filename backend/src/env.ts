import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });

let DB_HOST;
if (process.env.NODE_ENV === "DEVELOPMENT") {
    DB_HOST = "localhost";
} else {
    DB_HOST = "mysql";
}

console.log(DB_HOST);
console.log(process.env.DATABASE_PASSWORD)

export const env = {
    DB_HOST: DB_HOST,
    DB_PORT: parseInt(process.env.DATABASE_PORT),
    DB_USER: "levels",
    DB_PASSWORD: process.env.DATABASE_PASSWORD,
    DB_DATABASE: "levels"
}