// import { config } from "dotenv";
// config();
// import mysql from 'mysql2'
// import express from 'express';
// import cors from 'cors';
// import { router as usersRouter } from './routes/users.js';
// import { router as directorRouter } from './routes/directors.js';
// import { router as apartmentsRouter } from './routes/apartments.js';

// export const pool = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DB
// }).promise();

// const server = express();
// server.use((req, res, next) => {
//     next();
// })

// server.use((cors({ origin: '*' })));
// server.use(express.json());
// server.use('/api/users', usersRouter);
// server.use('/api/directors', directorRouter);
// server.use('/api/apartments', apartmentsRouter);

// server.listen(3336, () => {
//     console.log(`listening to requests at http://localhost:3336`);
// });
// export default pool;

///////////////////////////////////////


const express = require('express');
require('dotenv').config();
const cors = require('cors');
const usersRouter = require('./routes/usersRauter');
const directorsRouter = require('./routes/directors');
const apartmentsRouter = require('./routes/apartments');


const init = require('../../createDB');

const host = process.env.HOST;
const port = process.env.PORT;
const server = express();



server.use(cors({
    origin: 'http://localhost:3306',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


//get parameter to check if to call initialization
async function Start() { if (true) await init(); }
//Start();

server.use(express.json());

server.use('/users', usersRouter);
server.use('/directors', directorsRouter);
server.use('/apartments', apartmentsRouter);


server.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});