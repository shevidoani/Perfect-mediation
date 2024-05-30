import { config } from "dotenv";
config();
import mysql from 'mysql2'
import express from 'express';
import cors from 'cors';
import { router as usersRouter } from './routes/users.js';
import { router as directorRouter } from './routes/directors.js';
import { router as apartmentsRouter } from './routes/apartments.js';

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
}).promise();

const server = express();
server.use((req, res, next) => {
    next();
})

server.use((cors({ origin: '*' })));
server.use(express.json());
server.use('/api/users', usersRouter);
server.use('/api/directors', directorRouter);
server.use('/api/apartments', apartmentsRouter);

server.listen(3336, () => {
    console.log(`listening to requests at http://localhost:3336`);
});
export default pool;