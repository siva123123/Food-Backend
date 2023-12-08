const Meals=require('../model/meals')

exports.getAllMeals=async(req,res)=>{
    const list= await Meals.find()
    try{
        res.json({
            message:"fetched all meals",
            meals:list
        })
    }
    catch(error){
        console.log("error")
    }
}

