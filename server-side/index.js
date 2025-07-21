require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose")
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const teamMemberRoutes = require('./routes/teamMemberRoutes');
const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
}));
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


app.use('/api', userRoutes);
app.use ('/api/teams', teamRoutes);
app.use('/api/teamMembers', teamMemberRoutes);




app.listen(8080, (req, res) => {
    console.log("Server is running on port 8080")
})