const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const {generateToken,authenticateToken,authorization} = require('../auth/jwt')
const managers = require("../db/db")
const projects = require("../db/db")
const candidates = require("../db/db")
const submissions = require("../db/db")

// MANAGER SIGNUP
router.post("/manager_signup",async (req,res)=>{
    try{
        if(req.body._id === undefined || req.body.name === undefined || req.body.email === undefined || req.body.password === undefined){
            res.send("_id,name, email and password required")
        }else{
        const pass = await bcrypt.hash(req.body.password, 10);
        const manager = new managers({
        _id:req.body._id,
        name:req.body.name,
        email:req.body.email,
        password:pass,
        role:req.body.role
        })
        const data = await managers.insertMany(manager)
        console.log("signup successful")
        res.send("signup successful")
    }
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})

// MANAGER SIGNIN
router.post("/manager_signin",async(req,res)=>{
    try{
        const userdata = await managers.findOne({email:req.body.email})
        if(userdata){
            const compare = await bcrypt.compareSync(req.body.password,userdata.password)
            if(compare){
                const token = generateToken(req.body)
                res.send(token)
                console.log("signin successful",token)
            }else{
                console.log("wrong password entered")
                res.send("wrong password entered")
            }
        }else{
            res.send("user not found")
            console.log("user not found")
        }
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})
// GET ALL MANAGERS
router.get("/manager_signup",authenticateToken,authorization(["admin"]),
async (req,res)=>{
    try{
        const data = await managers.find()
        res.send(data)
        console.log(data)
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})

// PROJECTS CRUD
// CREATE PROJECT
router.post("/project",authenticateToken,authorization(["admin"]),
async (req,res)=>{
    try{
        const data = await projects.create(req.body)
        res.send("project created")
        console.log("project created")
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})
// GET ALL PROJECTS
router.get("/project",authenticateToken,async (req,res)=>{
    try{
        const data = await projects.find()
        res.send(data)
        console.log(data)
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})
// GET  PROJECT BY _ID
router.get("/project/:_id",authenticateToken,authorization(["admin"]),async (req,res)=>{
    try{
        const data = await projects.findOne({_id:req.params._id})
        res.send(data)
        console.log(data)
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})
// UPDATE PROJECT BY _ID
router.patch("/project/:_id",authenticateToken,authorization(["admin"]),async (req,res)=>{
    try{
        const data = await projects.findByIdAndUpdate({_id:req.params._id},req.body)
        res.send('project details are updated successfully. ')
        console.log('project details are updated successfully. ')
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})
// DELETE PROJECT BY _ID
router.delete("/project/:_id",authenticateToken,authorization(["admin"]),async (req,res)=>{
    try{
        const data = await projects.findByIdAndDelete({_id:req.params._id})
        res.send(`project  is deleted`)
        console.log(`project is deleted`)
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})
// PROJECT FILTER BY DIFFERENT PARAMETER
// GET PROJECTS BY TECH STACK
router.get("/projectts/:tech_stack",authenticateToken,async (req,res)=>{
    try{
        const data = await projects.find({tech_stack:req.params.tech_stack})
        res.send(data)
        console.log(data)
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})
//


// CANDIDATE SIGNUP
router.post("/candidate_signup",async (req,res)=>{
    try{
        if(req.body._id === undefined || req.body.name === undefined || req.body.email === undefined || req.body.password === undefined){
            res.send("_id,name, email and password required")
        }else{
        const pass = await bcrypt.hash(req.body.password, 10);
        const candidate = new candidates({
        _id:req.body._id,
        name:req.body.name,
        email:req.body.email,
        password:pass,
        qualification:req.body.qualification,
        project_name:req.body.project_name,
        date:req.body.date,
        role:req.body.role
        })
        const data = await candidates.insertMany(candidate);
        console.log("signup successful")
        res.send("signup successful")
    }
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})

// CANDIDATE SIGNIN
router.post("/candidate_signin",async(req,res)=>{
    try{
        const userdata = await candidates.findOne({email:req.body.email})
        if(userdata){
            const compare = await bcrypt.compareSync(req.body.password,userdata.password)
            if(compare){
                const token = generateToken(req.body)
                res.send(token)
                console.log("signin successful",token)
            }else{
                console.log("wrong password entered")
                res.send("wrong password entered")
            }
        }else{
            res.send("user not found")
            console.log("user not found")
        }
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})

// SUBMISSIONS
// POST SUBMISSIONS
router.post("/submission",authenticateToken,async (req,res)=>{
    try{
        const data = await submissions.create(req.body)
        res.send("project submitted successfully")
        console.log("project submitted successfully")
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})
// GET ALL SUBMISSION
router.get("/submission",authenticateToken,authorization(["admin"]),async (req,res)=>{
    try{
        const data = await submissions.find()
        res.send(data)
        console.log(data)
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})

// GET SUBMISSION BY _ID
router.get("/submission/:_id",authenticateToken,authorization(["admin"]),async (req,res)=>{
    try{
        const data = await submissions.findById({_id:req.params._id})
        res.send(data)
        console.log(data)
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})
// UPDATE SUBMISSION
router.patch("/submission/:_id",authenticateToken,authorization(["admin"]),async (req,res)=>{
    try{
        const data = await submissions.findByIdAndUpdate({_id:req.params._id},req.body)
        res.send('submission details are updated successfully. ')
        console.log('submission details are updated successfully. ')
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})

module.exports = router