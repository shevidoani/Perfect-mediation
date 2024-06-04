const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
dotenv.config({ path: "../.env" });
const usersRouter = require('./routes/usersRauter');
const apartmentsRouter = require('./routes/apartmentsRauter');
const apartmentsWaitingRouter = require('./routes/apartmentsWaitingRouter');
const filteringRouter = require('./routes/filteringRouter');
const imagesRouter = require('./routes/imagesRouter');

const host = "127.0.0.1";
const port = 3336;
const bodyParser = require('body-parser');
const server = express();
server.use(cors());
server.use(bodyParser.json())
server.use(express.urlencoded({ extended: true }));
server.use("/api/users", usersRouter);
server.use("/api/apartments", apartmentsRouter);
server.use("/api/apartmentsWaiting", apartmentsWaitingRouter);
server.use("/api/filtering", filteringRouter);
server.use("/api/images", imagesRouter);

server.use((cors({ origin: 'http://localhost:5173' })));

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
});

server.listen(port, host, () => {
    console.log(`listening to requests at http://localhost:3336`);
});
//express error middleware
///middleware-מחסום שנותן מעבר רק למורשים
///אימות-האם אנחנו מכירים אותך בכלל
 ///הרשאה-אם אתה מנהל אתה יכול להתקדם, אם לא אתה נחסם כבר עכשיו וממשיך כמשתמש רגיל