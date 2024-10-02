import pgPromise from 'pg-promise';


const pgp = pgPromise()
const PostgreSql = pgp({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)
  });

export default PostgreSql
