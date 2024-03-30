import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });

var INTERNAL_URL

if (process.env.PORT === "443") {
    INTERNAL_URL = "https://nginx:443";
} else {
    INTERNAL_URL = "http://nginx";
}

export const env = {
    CLIENT_ID: process.env.CLIENT_ID as string,
    CLIENT_SECRET: process.env.CLIENT_SECRET as string,
    CLIENT_TOKEN: process.env.CLIENT_TOKEN as string,

    URL: process.env.URL as string,
    INTERNAL_URL: "http://backend:2000" as string,
}