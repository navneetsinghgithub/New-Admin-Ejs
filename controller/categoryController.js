const categoryModel = require("../model/categoryModel")
const { Validator } = require("node-input-validator")
const { imageupload, checkValidation } = require("../middleware/helper")


module.exports = {
    createCategory: async (req, res) => {
        try {
            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            const v = new Validator(req.body, {
                name: "required",
            })
            let errorResponse = await checkValidation(v)
            if (errorResponse) {
                return res.json({
                    success: false,
                    status: 404,
                    message: errorResponse,
                    body: {}
                })
            }
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }
            const data = await categoryModel.create({
                name: req.body.name,japaneseName:req.body.japaneseName, image: req.body.image
            })
            res.redirect("/getCategoryPage")
        } catch (error) {
            console.log("error");
        }
    },
    getCategoryPage: async (req, res) => {
        try {
            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            const Data = await categoryModel.find()
            res.render("category/category.ejs", { Data, session: req.session.users })
        } catch (error) {
            console.log(error, "error");
        }
    },
    addCategoryPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            res.render("category/addCategory", { session: req.session.users })
        } catch (error) {
            console.log(error, "error");
        }
    },
    categoryViewPage: async (req, res) => {
        try {

            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const Data = await categoryModel.findOne({ _id: req.params.id })
            res.render("category/categoryView", { Data, session: req.session.users })
        } catch (error) {
            console.log(error, "error");
        }
    },
    editCategoryPage: async (req, res) => {
        try {
            const data = await categoryModel.findById({
                _id: req.params.id
            })

            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            res.render("category/editCategory", { session: req.session.users, data })
        } catch (error) {
            console.log(error, "error");
        }
    },
    updateCategory: async (req, res) => {
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }
            const data = await categoryModel.findByIdAndUpdate({
                _id: req.body.id
            }, { name: req.body.name, image: req.body.image }, { new: true })
            res.redirect("/getCategoryPage")
        } catch (error) {
            console.log(error, "error");
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const data = await categoryModel.findByIdAndDelete({
                _id: req.body.id
            })
        } catch (error) {
            console.log(error, "error");
        }
    },

}
