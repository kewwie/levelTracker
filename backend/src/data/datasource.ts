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
        __dirname + "./../dist/data/entities/*.js"
    ],
    migrations: [
        __dirname + "./../distdata/migrations/*.js"
    ],
}

export const dataSource = new DataSource(dataSourceOptions);