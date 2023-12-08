const Restaurent=require('../model/restaurent')


exports.getAllRestaurent=async(req,res)=>{
    const list =await Restaurent.find();
    try{
        res.json({
        Message:"Restaurents fetched Sucessfully",
        restaurent:list
        });
    }
      catch(error){
        res.status(500).send(error);
      } 
  
}

exports.getAllRestaurentByLocation=async(req,res)=>{
  const locationId=req.params.id
  try{
    const filter=await Restaurent.find({location_id:locationId})
    res.json({
      message:"done",
      restaurent:filter
  })
  }
  catch(error){
    console.log(error)
  }
}

exports.getAllRestaurentById=async(req,res)=>{
  const restaurentid=await Restaurent.findById(req.params.id)
  try{
    res.json({
      message:"done",
      restaurent:restaurentid
    })
  }
  catch(error){
    console.log(error)
  }
}



exports.filter = async (req, res) => {
  let mealtype_id = req.body.mealtype_id;
  let location_id = req.body.location_id;
  let cuisine_id = req.body.cuisine_id;
  let hcost = req.body.hcost;
  let lcost = req.body.lcost;
  let sort = req.body.sort ? req.body.sort : 1;
  let page = req.body.page ? req.body.page : 1;
 
  let itemPerPage = 2;
  let startIndex = (page * itemPerPage) - itemPerPage;
  let endIndex = (page * itemPerPage);
  
  

  let payload = {};

  if(mealtype_id){
      payload = {mealtype_id: {$elemMatch: { mealtype: mealtype_id}}};
  }
  if(mealtype_id && location_id){
      payload = {
          mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
          location_id : location_id
      }
  }
  if(mealtype_id && cuisine_id ){
      payload = {
          mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
          cuisine_id: {$elemMatch: { cuisine: cuisine_id}},
      }
  }
  if(mealtype_id && hcost && lcost){
      payload = {
          mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
          cost : {$lte: hcost, $gte : lcost}
      }
  }
  if(mealtype_id && cuisine_id && hcost && lcost){
      payload = {
          mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
          cost : {$lte: hcost, $gte : lcost},
          cuisine_id: {$elemMatch: { cuisine: cuisine_id}},
      }
  }
  if(mealtype_id && location_id && cuisine_id){
      payload = {
          mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
          location_id : location_id,
          cuisine_id: {$elemMatch: { cuisine: cuisine_id}}
      }
  }
  if(mealtype_id && location_id && hcost && lcost){
      payload = {
          mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
          location_id : location_id,
          cost : {$lte: hcost, $gte : lcost}
      }
  }
  if(mealtype_id && location_id && cuisine_id && hcost && lcost){
      payload = {
          mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
          location_id : location_id,
          cost : {$lte: hcost, $gte : lcost},
          cuisine_id: {$elemMatch: { cuisine: cuisine_id}}
      }
  }

  try {
    const result = await Restaurent.find(payload).sort({ cost: sort });
    const pagenation = result.slice(startIndex, endIndex);
    let arr = [];
    for (let i = 1; i <= Math.ceil(result.length / itemPerPage); i++) {
      arr.push(i);
    }
    res.status(200).json({
      Message: "Restaurants fetched successfully",
      restaurents: pagenation,
      pagecount: arr,
      currentpage: page
    });
  } catch (err) {
    res.status(500).send(err.message); // Sending the error message to the client
  }
      
}