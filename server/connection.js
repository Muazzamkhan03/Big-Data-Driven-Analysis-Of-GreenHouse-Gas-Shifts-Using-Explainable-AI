const mongoose = require('mongoose');
const {Pool} = require('pg');

const mongoURI = process.env.MONGO_URI;

const connectDb = async () => {
    try{
        const m = await mongoose.connect(mongoURI);
        if(m){
            console.log('Connected to db server');
        }
    }
    catch(error){
        console.log(error);
    }
}

const pgClient = new Pool({
    host: process.env.POSTGRES_URI,
    user: process.env.POSTGRES_USER,
    port: 5432,
    password: process.env.POSTGRES_PASSWORD,
    database: 'GHG_Emissions',
    ssl: {
        rejectUnauthorized: false, // For self-signed certificates
    }
});

const verifyPg = async () => {
    try{
        const result = await pgClient.query("SELECT * FROM public.emissions LIMIT 2");
        if(result.rows){
            console.log("Connected to Postgres server");
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { connectDb, pgClient, verifyPg };