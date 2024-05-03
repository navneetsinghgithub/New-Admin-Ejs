const mongoose = require("mongoose")
const notificationSchema = new mongoose.Schema({
    userId:
        { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    providerId:
        { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    message:
        { type: String },
    date:
        { type: String },
    status:
        { type: String },   //inactive = 0 , active = 1
}, { timestamps: true })
const notification = mongoose.model("notification", notificationSchema)
module.exports = notification