const multer = require("multer");
var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  exports.upload = multer({ storage: storage });

  exports.getImageUrl = async (pics)=>{
    var imageurl = '';
    var data = new FormData();
    data.append(
      "file",
      fs.createReadStream(pics.path)
    );
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "piyushproj");

    var config = {
      method: "post",
      url: "https://api.cloudinary.com/v1_1/piyushproj/image/upload",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

   await axios(config)
      .then(function (response) {
        console.log(response.data.url);
        imageurl = response.data.url
        // body.profile= response.data.url
      })
      .catch(function (error) {
        console.log(error);
      });
    return imageurl
  }

  