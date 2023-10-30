const mongoose = require("mongoose")
const postSchema = new mongoose.Schema(
 {
    title: {
        type: String,
    },
    content: {
        type: String
    },
    createdAt:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
 },
 {timestamps: true}
 
)
module.exports = mongoose.model("newPost", postSchema)