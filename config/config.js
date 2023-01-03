const dotEnv = require("dotenv");
dotEnv.config();

// module.exports = {
//   development: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     port: process.env.DB_PORT || 3000,
//   },
// };

module.exports = {
  development: {
    username: "root",
    password: "xfJ1m7ClJUKuoXTmFq0K",
    database: "railway",
    host: "containers-us-west-87.railway.app",
    dialect: process.env.DB_DIALECT,
    port: 5611,
  },
};
