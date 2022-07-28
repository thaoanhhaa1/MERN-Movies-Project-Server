require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const route = require('./route');
// const errorMiddlewares = require('./app/middlewares/errorMiddleware');

const port = process.env.PORT || 5000;
const app = express();

db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(route);
// app.use(errorMiddlewares);

// Enabling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
    );
    next();
});

app.listen(port, () => console.log('App running on port ' + port));
