const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
    firstName:
        { type: String },
    lastName:
        { type: String },
    email:
        { type: String },
    phone:
        { type: Number },
    message:
        { type: String }
}, { timestamps: true })
const contactUs = mongoose.model("contactUs", contactSchema)
module.exports = contactUs