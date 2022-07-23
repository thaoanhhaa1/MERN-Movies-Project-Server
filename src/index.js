const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const route = require('./route');
const errorMiddleware = require('./app/Middlewares/errorMiddleware');

const port = process.env.PORT || 5000;
const app = express();

// db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(route);
app.use(errorMiddleware);

app.listen(port, () => console.log('App running on port ' + port));
