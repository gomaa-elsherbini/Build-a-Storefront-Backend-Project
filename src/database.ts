import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
} = process.env;

const Client = new Pool({
  host: POSTGRES_HOST,
  database: process.env.ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

console.log(`${process.env.ENV} environment`);

export default Client;
