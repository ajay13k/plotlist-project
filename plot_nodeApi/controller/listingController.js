const Listing = require("../model/listingModel");
const UserType = require("../model/userTypeModel");
const Category = require('../model/categoryModel');

const date = require("date-and-time");
const { getImageUrl } = require("../middleware/uploadFile");
const Enquiry = require("../model/enquiryModel");
exports.createListing = async (req, res) => {
  try {
    const body = req.body;
    var listingImage = [];
    if(req.files.length !==0 ){
      for (var i = 0; i < req.files.length; i++) {
       await getImageUrl(req.files[i]).then(image=>{
          listingImage.push(image)
        });
        // listingImage.push(
        //   req.protocol + "://" + req.get("host") + "/" + req.files[i].path
        // );
      }
      body["image"] = listingImage;
    }
  
    var category = await Category.findById(body.categroyid);
    if(!category){
      res.status(200).send({
        message:"category not found !"
      })
    }else{
      body["postedDate"] = convert(new Date());
      var listing = await Listing.create(body);
      if (!listing) {
        res.status(200).send({
          message: "listing not created !",
        });
      } else {
        listing = await Listing.findById(listing._id)
          .populate("categroyid")
          .populate("PostedUserid", "-password");
        listing = await UserType.populate(listing, "PostedUserid.user_type");
        res.status(200).send({
          message:'listing created !',
          listing :listing
        });
      }
    }
   
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in create listing",
      subError: error.message,
    });
  }
};

exports.getListing = async (req, res) => {
  try {
    var salesListingCount = 0;
    var curr = new Date(); // get current date
    var today =  date.format(curr, "YYYY-MM-DD");
    var first = curr.getDate() - curr.getDay()+1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday =  new Date(curr.setDate(last));

    var monthgfirstDay = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var monthlastDay = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    var yearFirstDay = new Date(curr.getFullYear(), 0, 1);
    var yearLastDay = new Date(curr.getFullYear(), 11, 31);
   

   //day
    var day = await Listing.find({ postedDate: new Date(today)  , isDeleted:0});

    //week
    var week = await Listing.find({
      postedDate: {
        $gte: new Date(date.format(firstday, "YYYY-MM-DD")),
        $lt:  new Date(date.format(lastday, "YYYY-MM-DD")),
      },
      isDeleted:0
    });

    //month
    var month = await Listing.find({
        isDeleted:0,
      postedDate: {
        $gte: new Date(date.format(monthgfirstDay, "YYYY-MM-DD")),
        $lt: new Date(date.format(monthlastDay, "YYYY-MM-DD")),
      },
    });
    // year
    var year = await Listing.find({
        isDeleted:0,
        postedDate: {
          $gte: new Date(date.format(yearFirstDay, "YYYY-MM-DD")),
          $lt: new Date(date.format(yearLastDay, "YYYY-MM-DD")),
        },
      });
    var a = day.filter((data) => {
      if (data.status === "sales") {
        return (salesListingCount = salesListingCount + 1);
      }
    });
    var b = day.filter((data) => {
      if (data.status === "pendding") {
        return (salesListingCount = salesListingCount + 1);
      }
    });
    var c = week.filter((data) => {
      if (data.status === "sales") {
        return (salesListingCount = salesListingCount + 1);
      }
    });
    var d = week.filter((data) => {
      if (data.status === "pendding") {
        return (salesListingCount = salesListingCount + 1);
      }
    });

    var e = month.filter((data) => {
      if (data.status === "sales") {
        return (salesListingCount = salesListingCount + 1);
      }
    });
    var f = month.filter((data) => {
      if (data.status === "pendding") {
        return (salesListingCount = salesListingCount + 1);
      }
    });

    var j = year.filter((data) => {
      if (data.status === "sales") {
        return (salesListingCount = salesListingCount + 1);
      }
    });
    var k = year.filter((data) => {
      if (data.status === "pendding") {
        return (salesListingCount = salesListingCount + 1);
      }
    });


    var listings = await Listing.find({isDeleted:0})
      .sort({ updatedAt: -1 })
      .populate("categroyid")
      .populate("PostedUserid", "-password");
    listings = await UserType.populate(listings, "PostedUserid.user_type");
    res.status(200).send({
      day: {
        total: day.length,
        sales: a.length,
        pendding: b.length,
      },
      week: {
        total: week.length,
        sales: c.length,
        pendding: d.length,
      },
      month: {
        total: month.length,
        sales: e.length,
        pendding: f.length,
      },
      year: {
        total: year.length,
        sales: j.length,
        pendding: k.length,
      },
      listings:listings
    });
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in get listing",
      subError: error.message,
    });
  }
};

exports.deleteListing = async(req, res)=>{
    try{
        const listingId = req.params.id;
        var DeletedData={
            isDeleted:1,
            deletedBy:req.user._id,
            deletedDate:new Date()
        }
       const listing =  await Listing.findByIdAndUpdate(listingId,DeletedData,{new:true});
       if(!listing){
           res.status(200).send({
               message:"listing not deleted !"
           })
       }else{
        res.status(200).send({
            message:"listing deleted !"
        })
       }
   
    }catch(error){
        res.status(400).send({
            message:"Oops! something went wrong in delete listing ",
            subError:error.message
        });
    }
}

exports.searchNow = async(req,res)=>{
        try{
            const location = req.query.location ?  req.query.location : "" ;
            const minPrice = req.query.minPrice ? req.query.minPrice  : 100 ;
            const maxPrice = req.query.maxPrice ? req.query.maxPrice : 200 ;
                console.log(location , minPrice ,maxPrice)
            var searchListing =  await Listing.find({
                  "metadata.location":location,
                  "metadata.price":{ 
                            $gte: minPrice,
                            $lt:maxPrice
                        }
                        });
            // console.log(searchListing.length)
            // if(searchListing.length ===  0){
            //     res.status(400).send({
            //         message:"no search result found !"
            //     });

            // }else{

            //     res.status(200).send(searchListing)
            // }
            res.status(200).send(searchListing)
        }catch(error){
            res.status(400).send({
                message:"oops! something went wrong in search api",
                subError:error.message
            })
        }
}
exports.updateListing = async(req,res)=>{
  try{
      const body = req.body;
      const listingId = req.params.id;
      var listingImage = [];
      var  listing  = await Listing.findById(listingId);
      console.log(req.files.length)
      if(req.files.length !== 0 ){
        console.log('image update krnaa h')
        for (var i = 0; i < req.files.length; i++) {
          await getImageUrl(req.files[i]).then(image=>{
            listingImage.push(image)
          });
          // listingImage.push(
          //   req.protocol + "://" + req.get("host") + "/" + req.files[i].path
          // );
        }
        body["image"] = listingImage;
      }else{
        console.log('image nhi aai')
        for(var j=0 ; j < listing.image.length ; j++){
          listingImage.push(listing.image[j])
        }
          body['image']=listingImage ;
      }

     if(listing){
           listing= await Listing.findByIdAndUpdate(listingId,body,{new:true});
           res.status(200).send(listing)
     }else{
      res.status(400).send({
        message:"listing not found !"
      });
    }

  }catch(error){
    res.status(400).send({
      message:"Oops! something went wrong in update the listing",
      subError:error.message
    })
  }
}


exports.giveReview = async(req,res)=>{
  try{
    const body = req.body ;
    const listingId = req.params.listingid;
    if(!body.userid || !body.reviewPoint){
      res.status(400).send({
        message:"body is require"
      })
    }else{
      var alreadyReview = [];
      var listing = await Listing.findById(listingId);
       for(var i=0 ; i < listing.reviews.length ; i++){
           if(listing.reviews[i].userid.equals(body.userid)){
              //  console.log("already you have been give your review");
              alreadyReview.push(listing.reviews[i].userid)
          }
       }
      if(alreadyReview.length !== 0){
          res.status(400).send(
                {
                  message:"already you have been give your review for this listing "
                }
              )
       }else{
             listing =  await Listing.findByIdAndUpdate(listingId,{
              $push:{
            reviews:body
          }
             },{new:true});

             res.status(200).send(listing);
       }


    }
 
  }catch(error){
    res.status(400).send({
      message:"Oops! something went wrong in reviews",
      subError:error.message
    })
  }
}

exports.getListingByid = async(req,res)=>{
  try{
    const listingid = req.params.id;
   var  listing = await Listing.findById(listingid)
    .populate("categroyid")
    .populate("PostedUserid", "-password");
  listing = await UserType.populate(listing, "PostedUserid.user_type");
  res.status(200).send(listing);

  }catch(error){
    res.status(400).send({
      message:'oops! something went wrong',
      subError:error.message
    })
  }
}

exports.createEnquiry = async(req,res)=>{
  try{
    const listingid = req.params.listingid;
    const body = req.body;
    if(!listingid){
      res.send({
        message:'listing id is required'
      });
    }else{
      if(!body){
        res.send({
          message:'body is required'
        });
      }else{
        const data={
          listing:listingid,
          name:body.name,
          email:body.email,
          message:body.message
  
        }
           const enquiry = await Enquiry.create(data);
           if(!enquiry){
              res.status(200).send({
                message:'message not sended about enquiry'
              });
           }else{
            res.status(200).send({
              message:'message sended about enquiry'
            });
           }
      }
    }
  
   
    
  }catch(error){
    res.status(400).send({
      message:'Oops !something went wrong ',
      subError:error.message
    })
  }
}
exports.getAllEnquires = async(req,res)=>{
  try{
    const enquires = await Enquiry.find().populate('listing');
    if(!enquires){
      res.status(200).send({
        message:'enquires not found'
      })
    }else{
      res.status(200).send(enquires)
    }
  }catch(error){
    res.status(400).send({
      message:'Oops! something went wrong',
      subError:error.message
    })
  }
}
function convert(str) {
  var date = new Date(str);
  var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return date.getFullYear() + "-" + mnth + "-" + day;
}
