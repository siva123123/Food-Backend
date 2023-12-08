const mongoose=require('mongoose');
const schema=mongoose.Schema

const meanuSchema=new schema({
    restaurant_name:{
        type:String,
        required:true
    },
    restaurant_id:{
        type:String,
        required:true
    },
    menu_items:[{name:String,description:String,price:Number,qty:{type:Number,default:0}}]
})
module.exports=mongoose.model("Meanu", meanuSchema)