//* Multer: UploadFile:
//* https://expressjs.com/en/resources/middleware/multer.html
const multer = require("multer");
module.exports = multer({
  storage: multer.diskStorage({
    destination: "./upload/",
    filename: function (req, file, returnCallback) {
      returnCallback(null, Date.now() + '_' + file.originalname);// 1132145_oda1
    },
  }),
});