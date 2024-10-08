const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/express-app');
        console.log("MongoDB connected succesfully");
    } catch (error) {
        console.log("Failed to connect to MongoDB:",error.message);
        process.exit(1);
    }
}

module.exports = connectDB;