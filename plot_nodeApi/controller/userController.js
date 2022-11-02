const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const UserType = require("../model/userTypeModel");
const User = require("../model/userModel");

const jwt = require("jsonwebtoken");

const { getImageUrl } = require("../middleware/uploadFile");
exports.test = async (req, res) => {
  res.send("all are ok in backend !");
};
exports.signup = async (req, res) => {
  try {
    const body = req.body;
  
    if (req.file) {
     await getImageUrl(req.file).then(image=>{
          console.log("imageurl" , image)
           body.profile= image
         })
   
    }
    if (Object.keys(body).length === 0 && body.constructor === Object) {
      res.status(400).send({ message: "body data is required." });
    }
    if(!validateEmail(body.email)){
      res.status(200).send({ message: "email should be with proper domain" });
    }

    const newUser = new User(body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash;
    await User.find({ email: req.body.email ,isDeleted:false}).then((data) => {
      if (!data.length <= 0) {
        res.status(200).send({
          message: "please Insert Unique Data",
        });
      } else {
        newUser
          .save()
          .then((result) => {
            res.status(200).send(
             {
                message:'user registered !',
                user:result
}
              );
          })
          .catch((err) => {
            res.status(200).send({
              message: "user not created",
              SubError: err.message,
            });
          });
      }
    });
  } catch (error) {
    res.status(400).send({
      message: "Oops! somethin went wrong signup",
      subError: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      isDeleted: false,
    }).populate("user_type");
    if (!user) {
      return res.status(200).json({
        message: "user name not found",
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) {
        return res.status(200).json({
          message: "password is incorrect",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            _id: user._id,
          },
          process.env.SECRET,
          {
            expiresIn: "24h",
          }
        );

        res.status(200).json({
          message:"user login successfully !",
          user: user,
          token: token,
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      message: "Oops! somethin went wrong login ",
      subError: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const body = req.body;
    const userid = req.params.userid;
    console.log("sdgjsdgsdlgjksj",req.files.length)
    if(req.files.length !== 0 ){
      await getImageUrl(req.files[0]).then(image=>{
        body["profile"] = image;
      });
     
    }

    if (Object.keys(body).length === 0) {
      res.status(400).send({
        message: "body is required !",
      });
    }else{
      console.log(body)
      const user = await User.findByIdAndUpdate(userid, body, { new: true });
      if (!user) {
        res.status(201).send({
          message: "user not found !",
        });
      }else{
        await User.findById(user._id)
        .select("-password")
        .populate("user_type")
        .then((userinfo) => {
          res.status(200).send({
            message: "user updated !",
            userInfo: userinfo,
          });
        })
        .catch((error) => {
          res.status(201).send({
            message: "user not found",
            subError: error.message,
          });
        });
      }
    }
   

   
 
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in update profile",
      subError: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const body = req.body;
    const userid = req.params.userid;
    const user = await User.findById(userid);
    if (!user) {
      res.status(201).send({
        message: "user not found !",
      });
    }
    if (body.new_password !== body.conform_password) {
      res.status(201).send({
        message: "conform password not correct !",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(body.new_password, salt);
      bcrypt.compare(body.old_password, user.password, async (err, result) => {
        if (!result) {
          return res.status(201).json({
            message: "old password is incorrect you are not verify user !",
          });
        } else {
          const updateUser = await User.findByIdAndUpdate(
            userid,
            { password: hash },
            { new: true }
          );
          if (updateUser) {
            res.status(200).send({
              message: `password changed ! now your password is ${body.new_password}`,
            });
          } else {
            res.status(201).send({
              message: `password not changed  `,
            });
          }
        }
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in update profile",
      subError: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userid = req.params.userid;
    if (!userid) {
      res.status(200).send({
        message: "user id is required!",
      });
    }
    const user = await User.findById(userid);
    if (user.isDeleted) {
      res.status(200).send({
        message: "user already deleted !",
      });
    } else {
      var deleteObj = {
        isDeleted: 1,
        deletedBy: req.user._id,
        deletedDate: new Date(),
      };
      const deletedUser = await User.findByIdAndUpdate(userid, deleteObj, {
        new: true,
      });
      if (!deletedUser) {
        res.status(200).send({
          message: "user not deleted",
        });
      } else {
        res.status(200).send({
          message: "user deleted succesfully !",
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in update profile",
      subError: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const userid = req.params.userid;
    await User.findOne({ _id: userid, isDeleted: false })
      .populate("user_type")
      .select("-password")
      .then((user) => {
        if (!user) {
          res.status(400).send({
            message: "user not found",
          });
        } else {
          res.status(200).send(user);
        }
      })
      .catch((error) => {
        res.status(400).send({
          message: "user not found",
          subError: error.message,
        });
      });
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in get user",
      subError: error.message,
    });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const userid = req.query.userid;
    if (!userid) {
      await User.find({ isDeleted: false })
        .populate("user_type")
        .select("-password")
        .then((users) => {
          res.status(200).send(users);
        })
        .catch((error) => {
          res.status(400).send({
            message: "users not found !",
            subError: error.message,
          });
        });
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in get user",
      subError: error.message,
    });
  }
};

exports.getAuthToken = async (req, res) => {
  const token = jwt.sign({}, process.env.WEB_SECRET, { expiresIn: "24h" });
  res.status(200).send({
    authToken: token,
  });
};

// for developer uses

exports.createUserType = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "user type is required !",
      });
    } else {
      const newUserType = new UserType(req.body);
      await newUserType
        .save()
        .then((usertype) => {
          res.status(200).send(usertype);
        })
        .catch((error) => {
          res.status(400).send({
            message: "user type is not created !",
            subError: error.message,
          });
        });
    }
  } catch (error) {
    res.status(400).send({
      message: "Oops! somethin went wrong createUserType",
      subError: error.message,
    });
  }
};

exports.getUserType = async (req, res) => {
  try {
    var userType = await UserType.find();
    res.status(200).send(userType);
  } catch (error) {
    res.status(400).send({
      message: "Oops! somethin went wrong getUserType ",
      subError: error.message,
    });
  }
};


const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};