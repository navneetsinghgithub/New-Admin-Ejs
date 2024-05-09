const { success } = require("../middleware/helper");
const contactModel = require("../model/contactModel")

module.exports = {
    createContactus: async (req, res) => {
        try {
            const data = await contactModel.create({
                firstName: req.body.firstName, lastName: req.body.lastName,
                email: req.body.email, phone: req.body.phone, message: req.body.message
            })
            return res.json({
                success: true,
                status: 200,
                message: "created contact us",
                body: data
            })
        } catch (error) {
            console.log(error, "error");
        }
    },


    contactUsPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const contactUsData = await contactModel.find()
          
            res.render("notification/contactUs", { session: req.session.users, contactUsData })
        } catch (error) {
            console.log(error, "error");
        }
    },

    // getContactUs: async (req, res) => {
    //     try {
    //         if (!req.session.users) {
    //             res.redirect("/loginPage")
    //         }
    //         const getData = await notificationModel.find()
    //         res.render("notification/contactUs", { getData, session: req.session.users })
    //     } catch (error) {
    //         console.log(error, "error");
    //     }
    // },

    getSingleContactUs: async (req, res) => {
        try {
            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            const getData = await contactModel.findOne({
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

    contactUsView: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const Data = await contactModel.findOne({ _id: req.params.id })
            res.render("notification/contactUsView", { session: req.session.users, Data })
        } catch (error) {
            console.log(error, "error");
        }
    },
}