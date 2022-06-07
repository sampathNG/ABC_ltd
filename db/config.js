const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require("mongoose")

mongoose.connect(process.env.url, { useNewUrlParser: true ,
useUnifiedTopology: true})
const con = mongoose.connection

con.on('open', (err) => {
    if (err) {
        console.log(err)
    }
    console.log('connected....DB');
})

if(con){
    console.log("connected successfully")
}
else{
    console.log("not connected")
}
module.exports = con;
