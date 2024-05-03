const subCategoryModel = require("../model/subCategoryModel")
const categoryModel = require("../model/categoryModel")
const { Validator } = require("node-input-validator")
const { imageupload, checkValidation } = require("../middleware/helper")
const session = require("express-session")


module.exports = {
    createSubCategory: async (req, res) => {
        try {
            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            const v = new Validator(req.body, {
                name: "required",
                categoryId: "required",
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
            const data = await subCategoryModel.create({
                name: req.body.name, image: req.body.image,
                categoryId: req.body.categoryId
            })
            res.redirect("/getSubCategoryPage")
        } catch (error) {
            console.log(error, "error");
        }
    },
    getSubCategoryPage: async (req, res) => {
        try {
            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            const Data = await subCategoryModel.find().populate("categoryId")
            res.render("category/subCategory", { Data, session: req.session.users })
        } catch (error) {
            console.log(error, "error");
        }
    },
    addSubCategoryPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const DataCategory = await categoryModel.find();
            res.render("category/addSubCategory", { session: req.session.users, DataCategory })
        } catch (error) {
            console.log(error, "error");
        }
    },
    subCategoryViewPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const Data = await subCategoryModel.findOne({ _id: req.params.id }).populate("categoryId")
            res.render("category/subCategoryView", { Data, session: req.session.users })
        } catch (error) {
            console.log(error, "error");
        }
    },
    editSubCategoryPage: async (req, res) => {
        try {
            const DataCategory = await categoryModel.find();
            const data = await subCategoryModel.findById({
                _id: req.params.id
            })
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            res.render("category/editSubCategory", { session: req.session.users, data, DataCategory })
        } catch (error) {
            console.log(error, "error");
        }
    },
    updateSubCategory: async (req, res) => {
        try {
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }
            const data = await subCategoryModel.findByIdAndUpdate({
                _id: req.body.id
            }, { name: req.body.name, categoryId: req.body.categoryId, image: req.body.image }, { new: true })
            console.log(data,"------d--------");
            res.redirect("/getSubCategoryPage")
        } catch (error) {
            console.log(error, "error");
        }
    },
    deleteSubCategory: async (req, res) => {
        try {
            const data = await subCategoryModel.findByIdAndDelete({
                _id: req.body.id
            })
        } catch (error) {
            console.log(error, "error");
        }
    },


}