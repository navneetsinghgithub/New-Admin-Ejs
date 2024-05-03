var express = require('express');
var router = express.Router();
const userController = require("../controller/userController")
const adminController = require("../controller/adminController")
const cmsController = require("../controller/cmsController")
const categoryController = require("../controller/categoryController")
const subCategoryController = require("../controller/subCategoryController");
const bookingController = require('../controller/bookingController');
const notificationController = require('../controller/notificationController');

///////////////////////////////Admin//////////////////////////
router.get("/dashboard", adminController.dashboard)
router.get("/loginPage", adminController.loginPage)
router.post("/login", adminController.login)
router.get("/adminProfilePage", adminController.adminProfilePage)
router.get("/getAdminProfile/:id", adminController.getAdminProfile)
router.get("/editProfilePage", adminController.editProfilePage)
router.post("/updateAdminProfile", adminController.updateAdminProfile)
router.get("/changePasswordPage", adminController.changePasswordPage)
router.post("/changePassword", adminController.changePassword)
router.get("/logout", adminController.logout)






///////////////////////User///////////////////////////
router.post("/signup", userController.signup)
router.get("/getUserPage", userController.getUserPage)
router.get("/userViewPage/:id", userController.userViewPage)
router.post("/userStatus/:id", userController.userStatus)
router.get("/getProviderPage", userController.getProviderPage)
router.get("/providerViewPage/:id", userController.providerViewPage)
router.post("/ProStatus/:id", userController.ProStatus)





////////////////////////CMS////////////////////////
router.post("/createCms", cmsController.createCms)
router.get("/termConditionPage", cmsController.termConditionPage)
router.post("/updateTermCms", cmsController.updateTermCms)
router.get("/privacyPolicyPage", cmsController.privacyPolicyPage)
router.post("/updatePrivacyCms", cmsController.updatePrivacyCms)
router.get("/aboutUsPage", cmsController.aboutUsPage)
router.post("/updateAboutCms", cmsController.updateAboutCms)

//////////////////////////Category Controller///////////////////
router.post("/createCategory", categoryController.createCategory)
router.get("/getCategoryPage", categoryController.getCategoryPage)
router.get("/addCategoryPage", categoryController.addCategoryPage)
router.get("/categoryViewPage/:id", categoryController.categoryViewPage)
router.get("/editCategoryPage/:id", categoryController.editCategoryPage)
router.post("/updateCategory", categoryController.updateCategory)
router.post("/deleteCategory", categoryController.deleteCategory)


////////////////////////subCategory Controller///////////////////////
router.post("/createSubCategory", subCategoryController.createSubCategory)
router.get("/getSubCategoryPage", subCategoryController.getSubCategoryPage)
router.get("/addSubCategoryPage", subCategoryController.addSubCategoryPage)
router.get("/subCategoryViewPage/:id", subCategoryController.subCategoryViewPage)
router.get("/editSubCategoryPage/:id", subCategoryController.editSubCategoryPage)
router.post("/updateSubCategory", subCategoryController.updateSubCategory)
router.post("/deleteSubCategory", subCategoryController.deleteSubCategory)

////////////////////////////BOOKING///////////////////
router.get("/bookingPage", bookingController.bookingPage)
router.post("/createBoking",bookingController.createBoking)
router.get("/getBoking", bookingController.getBoking)
router.get("/getSingleBoking/:id", bookingController.getSingleBoking)
router.post("/bookingStatus/:id", bookingController.bookingStatus)
router.get("/bookingView/:id", bookingController.bookingView)

///////////////////////NOTIFICATION/////////////////////
router.post("/createNotification",notificationController.createNotification)
router.get("/notificationPage",notificationController.notificationPage)
router.get("/getNotification", notificationController.getNotification)
router.get("/notificationView/:id", notificationController.notificationView)
router.get("/getSingleNotification/:id", notificationController.getSingleNotification)












module.exports = router;


