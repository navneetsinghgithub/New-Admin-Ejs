const mongoose = require("mongoose")
const bokingSchema = new mongoose.Schema({
    userId:
        { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    providerId:
        { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    date:
        { type: String },
    title:
        { type: String },
    status:
        { type: String },   //Reject = 0 , accept = 1
}, { timestamps: true })
const boking = mongoose.model("boking", bokingSchema)
module.exports = boking