const cmsModel = require("../model/cmsModel")

module.exports = {
    createCms: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.render("/login", { session: req.session.users })
            }
            const data = await cmsModel.create({
                title: req.body.title, content: req.body.content, type: req.body.type
            })
            return res.json({
                message:"create",
                status:200,
                body:data
            })
        } catch (error) {
            console.log("error not create cms");
        }
    },

    termConditionPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.render("/login")
            }
            let data = await cmsModel.findOne({
                type: 1
            })
            res.render("cms/termCondition", { session: req.session.users, data })
        } catch (error) {
            console.log(error);
        }
    },
    updateTermCms: async (req, res) => {
        try {
            const data = await cmsModel.findOneAndUpdate({
                type: 1
            }, {
                title: req.body.title,
                content: req.body.editor1
            }, { new: true })
            res.redirect('/termConditionPage')
        } catch (error) {
            console.log(error);
        }
    },

    privacyPolicyPage: async (req, res) => {
        try {
            const data = await cmsModel.findOne({
                type: 2
            })
            res.render("cms/privacyPolicy", { session: req.session.users, data })
        } catch (error) {
            console.log(error);
        }
    },
    updatePrivacyCms: async (req, res) => {
        try {
            const data = await cmsModel.findOneAndUpdate({
                type: 2
            }, { title: req.body.title, content: req.body.editor1 }, { new: true })
            res.redirect("/privacyPolicyPage")
        } catch (error) {
            console.log(error);
        }
    },
    aboutUsPage: async (req, res) => {
        try {
            const data = await cmsModel.findOne({
                type: 3
            })
            res.render("cms/aboutUs", { session: req.session.users, data })
        } catch (error) {
            console.log(error);
        }
    },
    updateAboutCms: async (req, res) => {
        try {
            const data = await cmsModel.findOneAndUpdate({
                type: 3
            }, { title: req.body.title, content: req.body.editor1 }, { new: true })
            res.redirect("/aboutUsPage")
        } catch (error) {
            console.log(error);
        }
    },
}