const mongoose=require('mongoose')
const schema=mongoose.Schema

const mealsSchema=new schema({
    name:{
        type:String,
        required:true
    },
    mealtype_id:{
        type:Number,
        require:true
    },
    content:{
        type:String,
        required:true
    },
    
})

module.exports=mongoose.model('Meals',mealsSchema)