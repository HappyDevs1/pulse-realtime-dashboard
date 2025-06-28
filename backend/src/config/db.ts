const dbConfig = {
  HOST: process.env.POSTGRESQL_DB_HOST as string,
  USER: process.env.POSTGRESQL_DB_USER as string,
  PASSWORD: process.env.POSTGRESQL_DB_PASSWORD as string,
  DB: process.env.POSTGRESQL_DB as string,
  dialect: "postgres" as string,
  // declaring pool is optional, will leave it commented for now
  // pool: {
//   max: 5,
//   min: 0,
//   acquire: 30000,
//   idle: 10000
// }
};

export default dbConfig;