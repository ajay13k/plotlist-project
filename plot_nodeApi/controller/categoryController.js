const { getImageUrl } = require('../middleware/uploadFile');
const Category = require('../model/categoryModel');
const Listing = require('../model/listingModel');
exports.createCategory = async(req, res)=>{
    try{
        var body = req.body;
        if(req.files){

            for(var i=0 ; i<req.files.length ; i++){
                //   body[req.files[i].fieldname]= req.protocol+'://'+req.get('host')+'/'+req.files[i].path
                  await getImageUrl(req.files[i]).then(image=>{
                    console.log("imageurl" , image)
                    body[req.files[i].fieldname]= image
                   })
                }
        }


       await Category.create(body).then(category=>{
            res.status(200).send(category);
        }).catch(error=>{
            res.status(400).send({
                message:"category not created !",
                subError:error.message
            });
        });
        await Category.create()
    }catch(error){
        res.status(400).send({
            message:"Oops! something went wrong in create category",
            subError:error.message
        })
    }
}

exports.getCategory = async(req,res)=>{
    try{
        var categories = await Category.find({isDeleted:false}).sort();
        var listing = await Listing.find({isDeleted:false}).sort({updatedAt:-1});
        var categoryCount = [];
        var popularcategories = [];
        const counts = {};
        for(var i=0 ; i < categories.length ; i++){
            for( j=0 ; j < listing.length ; j++){
               if(categories[i]._id.equals( listing[j].categroyid) && listing[j].status === 'sales'){
                  // console.log(categories[i]._id ,"==>",categories[i]._id.equals( listing[j].categroyid))
                   categoryCount.push(categories[i]._id);
               }
           }
        }
        categoryCount.sort()
        categoryCount.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        var popularcateriesIds = Object.keys(counts)
      
        for(var k=0 ; k < popularcateriesIds.length ; k++){
             var a = await Category.findById(popularcateriesIds[k]);
             popularcategories.push(a)
        }
        res.status(200).send({
            categories:categories,
            popularcategories :popularcategories 

        });
    }catch(error){
        res.status(400).send({
            message:"Oops! something went wrong in get category",
            subError:error.message
        });
    }
}