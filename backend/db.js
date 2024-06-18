const mongoose = require('mongoose');
const mongoUri = 'mongodb+srv://sumitbhikhchandani99:Jbj1234%40@cluster0.aibhlfv.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
