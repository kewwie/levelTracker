import { DataSource } from "typeorm";
import { env } from "./env";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    entities: [
        "dist/**/*.entity.js",
        "src/**/*.entity.ts"
    ],
    synchronize: true,
})