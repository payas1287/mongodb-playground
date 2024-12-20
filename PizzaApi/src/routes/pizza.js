"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/pizza:

const pizza = require("../controllers/pizza");

//* Upload * Multer
// $ sudo npm i multer

const multer = require("multer");
//? upload middleware:
const upload = multer({
  // dest: './upload',
  storage: multer.diskStorage({
    destination: "./upload",
    filename: function (req, file, returnCallback) {
      returnCallback(null, Date.now() + "_" + file.originalname);
    },
  }),
});

// URL: /pizzas

router
  .route("/")
  .get(pizza.list)
  // .post(pizza.create)
  // .post(upload.single('image'), pizza.create)
  .post(upload.array("image"), pizza.create);
//.post(upload.any(), pizza.create)

router
  .route("/:id")
  .get(pizza.read)
  .put(pizza.update)
  .patch(pizza.update)
  .delete(pizza.delete);

/* ------------------------------------------------------- */
module.exports = router;
