require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose")
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors")

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully "))
    .catch((err) => console.log("MongoDb Connection error", err));

<<<<<<< HEAD
app.use('/api', userRoutes);
app.use ('/api/teams', teamRoutes);
app.use('/api/teamMembers', teamMemberRoutes);
=======
app.use('/api', authRoutes);
>>>>>>> ca3d6f002e10ecbb6381862274779de46f0fe4c3

app.listen(8080, (req, res) => {
    console.log("Server is running on port 8080")
})