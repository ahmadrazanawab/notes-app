const mongoose = require('mongoose');
 
mongoose.set("strictQuery", false);
const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL, () => {
        console.log("Connected to Mongodb Successfully");
    })
}

module.exports = connectDB;