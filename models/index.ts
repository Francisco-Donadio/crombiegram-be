import { Dialect } from "sequelize";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import config from "../config/config";

const sequelize = new Sequelize(
  config.development.database as string,
  config.development.username as string,
  config.development.password as string,
  {
    host: config.development.host,
    dialect: config.development.dialect as Dialect,
  } as SequelizeOptions
);

sequelize.addModels([__dirname + "/**/*.model.ts"]);

export { sequelize };
