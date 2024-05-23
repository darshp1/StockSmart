const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');


// // create application/json parser
// var jsonParser = bodyParser.json()

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongodb+srv://darshpat:<password>@cluster0.93epfez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongodb+srv://darshpat:<password>@cluster0.93epfez.mongodb.net/
// pB6fz3sO1L83U8Qe

const dbms_url = "mongodb+srv://darshpat:pB6fz3sO1L83U8Qe@cluster0.93epfez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// Connect to MongoDB
mongoose.connect(dbms_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'check1' 
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("MongoDB connection failed:", err);
});

// Listen for MongoDB connection errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});