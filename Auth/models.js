const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
 {
    user_name: {
        type: String,
    },
    email: {
        type: String
    },
    password:{
        type:  String,
        required: true
    },

 },
 {timestamps: true}
)
module.exports = mongoose.model("User", userSchema)