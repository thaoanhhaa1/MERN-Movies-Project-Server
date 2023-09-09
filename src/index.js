require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const route = require('./route');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const errorMiddleware = require('./app/middlewares/errorMiddleware');

const port = process.env.PORT || 5000;
const app = express();

db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', route);

// Configure swagger docs
const options = {
    swaggerDefinition: {
        info: {
            title: 'WMovies API',
            version: '1.0.0',
            description: 'My API for doing cool stuff!',
        },
    },
    apis: [path.join(__dirname, '/route/*.js')],
};

const swaggerSpecs = swaggerJsdoc(options);

app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// app.use(errorMiddleware);

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

module.exports = app;
