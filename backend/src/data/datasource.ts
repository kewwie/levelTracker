import { DataSource, DataSourceOptions } from "typeorm";
import { env } from "../env";

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    synchronize: false,
    entities: [
        "dist/data/entities/*.js"
    ],
    migrations: [
        "dist/data/migrations/*.js"
    ],
}

export const dataSource = new DataSource(dataSourceOptions);