const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const reviewRoute = require('./routes/api/reviews')
 
const app = express();
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const mongoDBUrl = 'mongodb+srv://abhishek:abhishek@cluster0.2spzc.mongodb.net/Tutorial-6?retryWrites=true&w=majority';
mongoose.connect(mongoDBUrl, { useNewUrlParser: true})
.then(() => {
    console.log("Connected to mongoDB");
})
.catch((error) => {
    console.log("mongoDB connection failed", error);
})

app.use("/", reviewRoute);

module.exports = app;