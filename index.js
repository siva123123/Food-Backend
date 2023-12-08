const express=require('express')
const mongoose=require('mongoose')
const bodyParser= require('body-parser')

const routes=require('./routes/restaurent')

const url="mongodb+srv://siva:siva%402002@cluster0.bdhwhxn.mongodb.net/?retryWrites=true&w=majority"

const app=express()
const port =8060

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type', 'Authorization');
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',routes)


mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})

app.listen(port,function(err){
    console.log("it is working at"+ port)
})
