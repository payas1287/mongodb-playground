"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const Comments = require("../models/comments");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    const data = await res.getModelList(Comments);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Comments),
      data,
    });
  },
  create: async (req, res) => {
    /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comments"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Comments"
                }
            }
        */
    const data = await Comments.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /* 
           #swagger.tags = ["Comments"]
           #swagger.summary = "Get Single Blog"
        */
    const data = await Category.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Blog"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Comments"
                }
            }
        */
    const data = await Category.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await createDocumentRegistry.findOne({ _id: req.params.id }),
    });
  },
  deletee: async (req, res) => {
    /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Single Category"
        */
    const data = await Category.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: true,
      message: "Something went wrong, data might be deleted already",
    });
  },
};




// "use strict";
// const { Comments } = require("../models/Comments"); // Yolda modeli doğru belirtmelisin
// const { Users } = require("../models/Users"); // Kullanıcı modelini de dahil etmelisin
// const { Blogs } = require("../models/Blogs"); // Blog modelini de dahil etmelisin

// // 1. Yorum Ekleme
// exports.createComment = async (req, res) => {
//   const { userId, blogId, comment } = req.body;

//   // Kullanıcı ve blog var mı kontrol et
//   try {
//     const user = await Users.findById(userId);
//     const blog = await Blogs.findById(blogId);

//     if (!user) {
//       return res.status(400).json({ message: "Kullanıcı bulunamadı." });
//     }

//     if (!blog) {
//       return res.status(400).json({ message: "Blog bulunamadı." });
//     }

//     const newComment = new Comments({
//       userId,
//       blogId,
//       comment,
//     });

//     await newComment.save();

//     return res.status(201).json({
//       message: "Yorum başarıyla eklendi.",
//       comment: newComment,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Sunucu hatası" });
//   }
// };

// // 2. Tek Yorum Getir
// exports.getComment = async (req, res) => {
//   const { commentId } = req.params;

//   try {
//     const comment = await Comments.findById(commentId)
//       .populate("userId", "name email") // Kullanıcı bilgilerini de populate et
//       .populate("blogId", "title");

//     if (!comment) {
//       return res.status(404).json({ message: "Yorum bulunamadı." });
//     }

//     return res.status(200).json(comment);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Sunucu hatası" });
//   }
// };

// // 3. Tüm Yorumları Getir (Belirli bir blog için)
// exports.getAllComments = async (req, res) => {
//   const { blogId } = req.params;

//   try {
//     const comments = await Comments.find({ blogId })
//       .populate("userId", "name email") // Kullanıcı bilgilerini de populate et
//       .populate("blogId", "title");

//     if (comments.length === 0) {
//       return res.status(404).json({ message: "Bu blog için yorum bulunamadı." });
//     }

//     return res.status(200).json(comments);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Sunucu hatası" });
//   }
// };

// // 4. Yorum Güncelleme
// exports.updateComment = async (req, res) => {
//   const { commentId } = req.params;
//   const { comment } = req.body;

//   try {
//     const updatedComment = await Comments.findByIdAndUpdate(
//       commentId,
//       { comment },
//       { new: true } // Yeni haliyle döndür
//     );

//     if (!updatedComment) {
//       return res.status(404).json({ message: "Yorum bulunamadı." });
//     }

//     return res.status(200).json({
//       message: "Yorum başarıyla güncellendi.",
//       updatedComment,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Sunucu hatası" });
//   }
// };

// // 5. Yorum Silme
// exports.deleteComment = async (req, res) => {
//   const { commentId } = req.params;

//   try {
//     const deletedComment = await Comments.findByIdAndDelete(commentId);

//     if (!deletedComment) {
//       return res.status(404).json({ message: "Yorum bulunamadı." });
//     }

//     return res.status(200).json({
//       message: "Yorum başarıyla silindi.",
//       deletedComment,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Sunucu hatası" });
//   }
// };