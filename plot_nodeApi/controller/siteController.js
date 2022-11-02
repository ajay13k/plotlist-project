const siteContent = require('../model/siteContentModel');
const Contact = require('../model/contactModel');
const { getImageUrl } = require('../middleware/uploadFile');
exports.createSiteOption = async(req,res)=>{
    try{
   const body = req.body;
   var keys = Object.keys(body);
   
   body['isDeleted']= 0 ;
   body['deletedBy']="";
   body['deletedDate']=""
   if (req.file) {
    await getImageUrl(req.file).then(image=>{
         console.log("imageurl" , image)
          body.image = image
        })
  
   }

  if(keys.includes("related_tab")){
    await siteContent.create(body).then(siteData=>{
        res.status(200).send({
            message:'site content created !',
            siteData:siteData
        });
    }).catch(error=>{
      res.status(200).send({
          message:"Oops! something went wrong in create site option",
          subError:error.message
      });
   });
  }else{
    res.status(200).send({
        message:"releted_tab key is required! with other key"
    }); 
  }
 
    }catch(error){
        res.status(400).send({
            message:"Oops! something went wrong in create site option",
            subError:error.message
        })
    }
}

exports.getSiteOption = async(req,res)=>{
    try{
       const siteData = await siteContent.find({isDeleted:0});
       if(!siteData){
        res.status(400).send({
            message:"site content not found !",
            subError:siteData
        });

       }else{
           res.status(200).send(siteData);
       }
    }catch(error){
        res.status(400).send({
            message:"Oops! something went wrong in get site option"
        })
    }
}


exports.saveContactor = async(req,res)=>{
    try{
            const body = req.body;
            await Contact.create(body).then(contact=>{
                res.status(200).send(contact);
            }).catch(error=>{
                res.status(400).send({
                    message:"failed to contact us",
                    subError:error.message
                });
            })
    }catch(error){
        res.status(400).send({
            message:"Oops! something went wrong "
        })
    }
}

exports.deletedSiteOption = async(req,res)=>{
     try{
   const id =  req.params.id;
   if(!id){
       res.status(201).send({
           message:'please provide id'
       });
   }else{
       const deleteData = await siteContent.findByIdAndUpdate(id,{isDeleted:1},{new:true});
       if(deleteData){
           res.status(201).send({
               message:'site content deleted '
           });
       }else{
        res.status(201).send({
            message:'site content not deleted '
        });
       }
   }
     }catch(error){
        res.status(500).send({
            message:'Oops ! something went wrong in delete the site content',
            subError:error.message
        })
     }
}

exports.updateSiteOption = async(req,res)=>{
    try{
          const body = req.body;
          const id=req.params.id;
          const  updateData= await siteContent.findByIdAndUpdate(id,body,{new:true});
          if(!updateData){
              res.status(201).send({
                  message:'site content not updated!'
              });
          }else{
              res.status(200).send({
                  message:'site content updated !'
              })
          }
    }catch(error){
        res.status(500).send({
            message:'Oops ! something went wrong in update the site content',
            subError:error.message
        })
    }
}