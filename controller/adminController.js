const mongoose = require("mongoose")
const userModel = require("../model/userModel")
const bookingModel = require("../model/bookingModel")
const categoryModel = require("../model/categoryModel")
const subCategoryModel = require("../model/subCategoryModel")

const bcrypt = require("bcrypt")
const saltRound =10
const session = require("express-session")

module.exports = {
    dashboard: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            
            const user = await userModel.find({role:1}).count()
            const provider = await userModel.find({role:2}).count()
           const boking = await bookingModel.find().count()
           const category = await categoryModel.find().count()
           const subCategory = await subCategoryModel.find().count()
      
           const monthlyBooking = await bookingModel.aggregate([
            {
              $match: {
                createdAt: { $exists: true },
              },
            },
            {
              $group: {
                _id: {
                  year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
              },
            },
            {
              $sort: {
                "_id.year": 1,
                "_id.month": 1,
              },
            },
          ]);
      
          const monthBook = [];
          const countBook = [];
      
          const bookmonthCountMap = new Map();
      
          monthlyBooking.forEach((item) => {
            const { month } = item._id;
            bookmonthCountMap.set(month, item.count);
          });
      
          for (let month = 1; month <= 12; month++) {
            monthBook.push(month);
            countBook.push(bookmonthCountMap.get(month) || 0);
          }
            const msg = req.flash("msg");
            return res.render("common/dashboard", {
              session: req.session.users,
              msg,
              user: user,
              provider: provider,
              boking:boking,
              category:category,
              subCategory:subCategory,
              monthBook,
              countBook,
            });
        } catch (error) {
            console.log(error);
        }
    },


    loginPage: async (req, res) => {
        try {
            const msg = req.flash("msg");
            res.render("admin/login.ejs", { msg })
        } catch (error) {
            console.log(error);
        }
    },
    login: async (req, res) => {
        try {
            let login = await userModel.findOne({ email: req.body.email })
            if (!login) {
                req.flash("msg", "Data not found")
                res.redirect('/loginPage')
            }
            else if (login.isVerified === 0) {
                req.flash("msg", "not verified")
                res.redirect('/loginPage')
            }
            const password = await bcrypt.compare(req.body.password, login.password);
            if (!password) {
                req.flash("msg", "wrong password")
                res.redirect('/loginPage')
            } else {
                req.session.users = login
                req.flash("msg", "Login successfully")
                res.redirect("/dashboard")
            }
        } catch (error) {
            console.log(error, "error");
        }
    },

    adminProfilePage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            res.render("admin/adminProfile", { session: req.session.users })
        } catch (error) {
            console.log(error);
        }
    },
    getAdminProfile: async (req, res) => {
        try {

            const getProfile = await userModel.findById({
                _id: req.params.id
            })
            return res.json({
                success: true,
                status: 200,
                message: " get profile successful",
                body: getProfile
            })
        } catch (error) {
            return res.json({
                success: false,
                status: 400,
                message: "error",
            })
        }
    },
    editProfilePage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const msg = req.flash("msg");
            res.render("admin/editProfile", { session: req.session.users, msg })
        } catch (error) {
            console.log(error);
        }
    },
    updateAdminProfile: async (req, res) => {
        try {
            if (!req.session.users || !req.session.users._id) {
                return helper.failed(res, "User session not found or missing _id");
            }
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }
            const updateAdminProfile = await userModel.findByIdAndUpdate({
                _id: req.session.users._id
            }, { name: req.body.name, image: req.body.image, contact: req.body.contact }, { new: true })
            let login = await userModel.findOne({ _id: req.session.users._id })
            req.session.users = login
            res.redirect("/dashboard")
            res.flash("msg", "updated admin profile")
        } catch (error) {
            console.log(error);
        }
    },

    changePasswordPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const msg = req.flash("msg");
            res.render("admin/changePassword.ejs", { session: req.session.users, msg })
        } catch (error) {
            console.log(error);
        }
    },
    changePassword: async (req, res) => {
        try {
            const data = await userModel.findOne({ _id: req.session.users._id })
            const decryptPassword = await bcrypt.compare(req.body.oldPassword, data.password)
            if (decryptPassword == false) {
                req.flash('error', 'Old pass does not match')
            }
            const encryptPassword = await bcrypt.hash(req.body.newPassword, saltRound)
            data.password = encryptPassword
            data.save()
            req.flash("success", "password updated successfully")
            return res.redirect('/changePasswordPage')
        } catch (error) {
            console.log(error, "error");
        }
    },

    logout: async (req, res) => {
        try {
            delete req.session.users
            res.redirect('/loginPage')
        } catch (error) {
            console.log(error, "error");
        }
    },





}