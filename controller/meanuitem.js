const Meanu=require('../model/meauitem')


exports.MeanuItem=async(req,res)=>{
  const meanuitemid=req.params.id

    try{
        const list= await Meanu.find({restaurant_id:meanuitemid})
        res.json({
          message:"done",
          meanu:list
        })
      }
      catch(error){
        console.log(error)
      }
    
}