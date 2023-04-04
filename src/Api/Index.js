require("./db")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())



//Database Part 

//Registration Data Schema 
const RegSchema = new mongoose.Schema({
    FullName:String,
    Username:String,
    Password:String,
    Email:String
})
// Registration Database Collection
const RegDB = new mongoose.model("RegData",RegSchema)


app.post("/Register",async (req,res)=>{
    const Data = new RegDB ({
        FullName:req.body.FullName,
        Username:req.body.Username,
        Password:req.body.Password,
        Email:req.body.Email
    })
    const result = await Data.save()
    console.log(result)
    res.status(200).send({status:true})

  
})

app.post("/Find",async(req,res)=>{
    const Data = await RegDB.find({Email:req.body.Email})
    res.status(200).send({status:true,Data:Data})
})

app.listen(8000,()=>{
    console.log("I am Listening at port 3000")
})