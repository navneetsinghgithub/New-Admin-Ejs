const mongoose =require("mongoose")
const userModel = require("../model/userModel")
const bookingModel = require("../model/bookingModel")

module.exports ={
    createBoking :async(req,res)=>{
        try {
            const dataBook = await bookingModel.create({
                userId: req.body.userId, providerId: req.body.providerId,
                date: req.body.date, status: req.body.status, title: req.body.title, 
            })
            return res.json({
                message :"created",
                status:200,
                body:dataBook
            })
        } catch (error) {
            console.log(error, "error");
        }
    },

    bookingPage: async (req, res) => {
        try {
          if (!req.session.users) {
            return res.redirect("/loginPage")
          }
          const bokingData = await bookingModel.find().populate(['userId', 'providerId'])
          res.render("boking/booking", { session: req.session.users, bokingData })
        } catch (error) {
          console.log(error, "error");
        }
      },

    getBoking: async (req, res) => {
        try {
            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            const getData = await bookingModel.find().populate({
                path: 'userId',
                select: 'name'
            })
                .populate({
                    path: 'providerId',
                    select: 'name'
                });

            res.render("boking/booking", { getData, session: req.session.users })
        } catch (error) {
            console.log(error, "error");
        }
    },

    getSingleBoking: async (req, res) => {
        try {
            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            const getData = await bookingModel.findOne({
                _id: req.params.id
            })
            return res.json({
                status: 200,
                message: "get single",
                body: getData
            })
        } catch (error) {
            console.log(error, "error");
        }
    },

    bookingView: async (req, res) => {
        try {
          if (!req.session.users) {
            return res.redirect("/loginPage")
          }
          const Data = await bookingModel.findOne({ _id: req.params.id }).populate(['userId', 'providerId'])
          res.render("boking/bookingView", { session: req.session.users, Data })
        } catch (error) {
          console.log(error, "error");
        }
      },

    bookingStatus: async (req, res) => {
        try {
          const data = await bookingModel.findByIdAndUpdate({
            _id: req.params.id
          }, { status: req.body.status }, { new: true })
         
          return res.status(200).json({
            code: 200,
            msg: req.flash("msg", "Status update successfully"),
          });
        } catch (error) {
          console.log(error, "error");
        }
      },
}