import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });

export const env = {
    URL: process.env.URL as string,
    INTERNAL_URL: "http://nginx" as string,
}