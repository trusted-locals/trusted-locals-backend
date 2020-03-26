require('dotenv').config()

const { MongoClient } = require('mongodb');

const database = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE
    : process.env.DEV_DATABASE;

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = {client,database}