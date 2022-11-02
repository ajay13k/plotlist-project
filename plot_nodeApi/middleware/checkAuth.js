const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

 exports.protected = async (req,res,next)=>{
      try{
          let token;
          if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                token = req.headers.authorization.split(" ")[1];
                var decode = jwt.verify(token,  process.env.SECRET)
                
                req.user = await User.findById(decode._id).select('-password');
                next();
          }else{
              res.status(400).send({
                  message:'please provide token'
                 })
          }  
      }catch(error){
          res.status(400).send({
              message:"Oops! something went wrong",
              subError:error.message
          })
      }
};
exports.webProtected = async (req,res,next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
              token = req.headers.authorization.split(" ")[1];
              var decode = jwt.verify(token, process.env.WEB_SECRET)
              next();
        }else{
            res.status(400).send({
                message:'please provide token'
               })
        }  
    }catch(error){
        res.status(400).send({
            message:"Oops! something went wrong",
            subError:error.message
        })
    }
};