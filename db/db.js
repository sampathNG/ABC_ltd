const mongoose = require("mongoose")

// PROJECT SCHEMA

const projectSchema = new mongoose.Schema({
    _id:{type:Number,required:true},
    project_name:{type:String,required:true},
    tech_stack:{type:String,required:true},
    project_details:{type:String,required:true},
    hiring_manager:{type:String,required:true},
    status:{type:String,default:"active"},
    isDeleted:{type:Boolean,default:false}
})

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

// MANAGER SCHEMA

const managerSchema = new mongoose.Schema({
    _id: {type:Number,required:true},
    name: {type:String,required:true},
    email: {type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"admin",required:true}
})

// SUBMISSION SCHEMA
const submissionSchema = new mongoose.Schema({
    _id: {type:Number,required:true},
    candidate_name:{type:String,required:true},
    project_name: {type:String,required:true},
    isSubmitted:{type:Boolean,default:true},
    submission_date: {type:Date,required:true},
    isSelected:{type:Boolean,default:false},
    github:{type:String,required:true},
    linkedin:{type:String,required:true}
})

const projects = mongoose.model("projects",projectSchema)
const submissions = mongoose.model("submissions",submissionSchema)
const candidates = mongoose.model("candidates",candidateSchema)
const managers = mongoose.model("managers",managerSchema)
module.exports = managers
module.exports = projects
module.exports = submissions
module.exports = candidates
