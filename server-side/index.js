require('dotenv').config(); 

const express = require("express"); 
const mongoose = require("mongoose")
const app = express(); 
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully "))
    .catch((err) => console.log("MongoDb Connection error", err));

app.use('/api', authRoutes);

app.listen(8080,(req,res)=>{
    console.log("Server is running on port 8080")
})