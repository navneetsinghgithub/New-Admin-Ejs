const mongoose = require("mongoose")
const notificationModel = require("../model/notificationModel")
const session = require("express-session")

module.exports = {
    createNotification: async (req, res) => {
        try {
            const data = await notificationModel.create({
                userId: req.body.userId, providerId: req.body.providerId, message: req.body.message,
                status: req.body.status
            })
            return res.json({
                message: "create notifi",
                status: 200,
                body: data
            })
        } catch (error) {
            console.log(error, "error");
        }
    },
    notificationPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const notificationData = await notificationModel.find().populate(['userId', 'providerId'])
          
            res.render("notification/notification", { session: req.session.users, notificationData })
        } catch (error) {
            console.log(error, "error");
        }
    },

    // getNotification: async (req, res) => {
    //     try {
    //         if (!req.session.users) {
    //             res.redirect("/loginPage")
    //         }
    //         const getData = await notificationModel.find().populate({
    //             path: 'userId',
    //             select: 'name'
    //         })
    //             .populate({
    //                 path: 'providerId',
    //                 select: 'name'
    //             });

    //         res.render("notification/notification", { getData, session: req.session.users })
    //     } catch (error) {
    //         console.log(error, "error");
    //     }
    // },

    // getSingleNotification: async (req, res) => {
    //     try {
    //         if (!req.session.users) {
    //             res.redirect("/loginPage")
    //         }
    //         const getData = await notificationModel.findOne({
    //             _id: req.params.id
    //         })
    //         return res.json({
    //             status: 200,
    //             message: "get single",
    //             body: getData
    //         })
    //     } catch (error) {
    //         console.log(error, "error");
    //     }
    // },

    notificationView: async (req, res) => {
        try {

         
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const Data = await notificationModel.findOne({ _id: req.params.id }).populate(['userId', 'providerId'])
            res.render("notification/notificationView", { session: req.session.users, Data })
        } catch (error) {
            console.log(error, "error");
        }
    },
}