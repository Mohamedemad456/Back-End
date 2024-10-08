
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4000;
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./controllers/authMiddleware');
const connectDB = require('./config/db');
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/task',authMiddleware ,taskRoutes);

app.listen(port,'localhost', async() => {
    console.log("Express listening on port:",port);
});