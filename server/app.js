require('dotenv').config();

const express = require('express');
const { connectDb, pgClient, verifyPg } = require('./connection');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const verifyJWT = require('./Middlewares/verifyJWT');
const rateLimiter = require('./Middlewares/rateLimiter');

const port = process.env.PORT || 5000;

const swaggerOptions = {
    definition : {
        openapi: "3.0.0",
        info: {
            title: "Final Year Project APIs",
            version: "1.0.0",
            description: "Big Data-Driven Analysis of Greenhouse Gas Shifts Using Explainable AI"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: [
        "./Routes/*.js"
    ]
};

const apiSpecs = swaggerJsDoc(swaggerOptions);


const app = express();

app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.set('trust proxy', true);

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpecs));
app.use('/api', require('./Routes'));

app.use('/*', verifyJWT, rateLimiter, (req, res)=>{
    res.status(404).json({ success: false, error: "Endpoint not found. Try a valid endpoint" });
});

app.listen(port, ()=>{
    connectDb();    
    verifyPg();
    console.log(`App listening on http://localhost:${port}`);
})