const Location=require('../model/location')

exports.getAllLocation=async(req,res)=>{
    const list=await Location.find()
    try{
        res.json({
            message:"fetched all Location",
            location:list
        })
    }
    catch(error){
        console.log("error")
    }
}

