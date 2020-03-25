require('dotenv').config()

const {MongoClient} = require('mongodb');

const uri = process.env.DEV_DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = client