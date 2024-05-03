const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:
        { type: String },
    email:
        { type: String },
    password:
        { type: String },
    contact:
        { type: Number },
    image:
        { type: String },
    role:
        { type: Number, enum: [0, 1, 2], default: 1 },   //admin = 0 , user = 1  , provider=2
    status:
        { type: String },  //inactive = 0 , active = 1
    token:
        { type: String },
    logintime:
        { type: Number }
}, { timestamps: true })

const user = mongoose.model("user", userSchema)
module.exports = user
