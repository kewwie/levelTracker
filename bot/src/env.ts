import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });

export const env = {
    CLIENT_ID: process.env.CLIENT_ID as string,
    CLIENT_SECRET: process.env.CLIENT_SECRET as string,
    CLIENT_TOKEN: process.env.CLIENT_TOKEN as string,

    URL: process.env.URL as string,
}