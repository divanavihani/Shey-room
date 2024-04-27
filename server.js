const express = require("express");


const app =express();
const dbconfig = require('./db')
const roomsroute=require('./routes/roomsRoute')
const userRoute=require('./routes/usersRoute')
const bookingRoute=require('./routes/bookingsRoute')

app.use(express.json())

app.use('/api/rooms',roomsroute)
app.use('/api/users',userRoute)
app.use('/api/bookings',bookingRoute)

app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Node Server Started using Nodemon!'));