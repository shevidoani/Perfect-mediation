const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
dotenv.config({ path: "../.env" });
const usersRouter = require('./routes/usersRauter');
const loginsRouter = require('./routes/loginRaurer');
const signupRouter = require('./routes/signupRauter');
const temporaryPasswordRauter = require('./routes/temporaryPasswordRauter');
const completeSignupRauter = require('./routes/completeSignupRauter');
const apartmentRauter = require('./routes/apartmentsRauter');
const host = "127.0.0.1";
const port = 3336;
const bodyParser = require('body-parser');
const server = express();
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.json())
server.use(express.urlencoded({ extended: true }));
server.use("/api/users", usersRouter);
server.use("/api/login", loginsRouter);
server.use("/api/signup", signupRouter);
server.use("/api/completeSignup", completeSignupRauter);
server.use("/api/temporaryPassword", temporaryPasswordRauter);
server.use("/api/apartments", apartmentRauter);
server.use((cors({ origin: 'http://localhost:3336' })));
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3336'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
});

server.listen(port, host, () => {
    console.log(`listening to requests at http://localhost:3336`);
});