const express=require('express')
const mongoose=require('mongoose')
const bodyParser= require('body-parser')

const routes=require('./routes/restaurent')

const url="mongodb+srv://sivadatabase12:Siva%402002@cluster0.irvzkhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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

setInterval(async () => {
  try {
    await mongoose.connection.db.admin().ping();
    console.log('MongoDB keep-alive ping');
  } catch (err) {
    console.error('Ping failed:', err);
  }
}, 5 * 60 * 1000); // every 5 minutes


mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})

app.listen(port,function(err){
    console.log("it is working at"+ port)
})
