const mongoose = require("mongoose")
// CANDIDATE SCHEMA

const candidateSchema = new mongoose.Schema({
    _id: {type:Number,required:true},
    name: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    qualification: {type:String,required:true},
    project_name:{type:String,required:true},
    date:{type:Date,required:true},
    role:{type:String,default:"user"}
})

const candidates = mongoose.model("candidates",candidateSchema)

module.exports = candidates
