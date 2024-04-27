
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://divana:divana%40123@cluster0.q0nh6z5.mongodb.net/mern-rooms');


const connection = mongoose.connection;

connection.on('error', () => {
  console.log('MongoDB Connection failed');
});

connection.on('connected', () => {
  console.log('MongoDB Connection successful');
});

module.exports = mongoose;
