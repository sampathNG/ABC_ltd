require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const db = require("./db/config")
const route = require("./routes/r")
app.use("/",route)


app.listen(process.env.port,console.log(`running on port ${process.env.port}`))