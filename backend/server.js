
const express = require('express');
const app = express();
const cors = require('cors'); // Import cors

const dotenv = require('dotenv');
app.use(express.json());

// app.use(cors());  //without s3

app.use(cors({
    origin: 'http://task-manager-rosche.s3-website-us-east-1.amazonaws.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const connectDB = require('./utils/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const PORT = process.env.PORT || 3000;



app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);


connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', ()  => {
        // console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Server running on http://0.0.0.0:${PORT}`);

    });
});