import { DataSource, DataSourceOptions } from "typeorm";
import { env } from "../env";

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    migrations: ['dist/**/migrations/*.js'],
    entities: ['dist/**/entities/*.js'],
    //logging: ["error", "query"],
    synchronize: false,
    debug: false,
}

export const dataSource = new DataSource(dataSourceOptions);