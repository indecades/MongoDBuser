const express = require('express');
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const cors = require("cors");
const path = require('path')
const user = require("./controller/user.controller")
dotenv.config();

const app = express()
app.use(cors())

app.use(express.json());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB!')
}).catch((err)=> {
    console.log(err)
})

app.post("/user/create-new-user", user.createNewUser)

app.listen(8080, function () {
console.log('Listening on port 8080!')
})