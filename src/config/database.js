import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.POSTGRES_HOSTNAME,
    database: process.env.POSTGRES_DB_NAME,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    max: 20,
    connectionTimeoutMillis: 1000,
    idleTimeoutMillis: 1000,
});

pool.on('connection', () => {
    console.log('Successfully connected to SMM database! :)');
})

export const query = (text, params) => pool.query(text, params); 