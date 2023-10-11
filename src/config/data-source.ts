import { DataSource } from "typeorm";
import path from "path";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "demo",
  entities: [path.join(__dirname, "../entities", "*.js")],
  migrations: [path.join(__dirname, "../migration", "*.js")],
  
});

