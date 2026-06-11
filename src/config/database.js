const mongoose = require('mongoose');

const connectDB = async () => {
 await mongoose.connect('mongodb+srv://nodejs_user:e6ZW06w63X5zpw8H@cluster0.clqb0ld.mongodb.net/devTinder')}


module.exports = connectDB;
 