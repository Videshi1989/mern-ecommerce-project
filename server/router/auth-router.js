const express = require("express");
const router = express.Router();

const authcontrollers = require("../controllers/auth-controller.js");
//const signupSchema = require("../validators/auth-validator-signup.js"); 
//const signinSchema = require("../validators/auth-validator-signin.js");
//const signinSchemacart = require("../validators/auth-validator-signin-cart.js"); 
//const signupSchemacart = require("../validators/auth-validator-signup-cart.js");
const validate = require("../middlewares/validate-middleware.js");
const authMiddleware = require("../middlewares/auth-middleware.js"); 

          
//router.route('/register').get(authcontrollers.register);
router.route('/register').post(authcontrollers.register);      //for postman
router.route('/registercart').post(authcontrollers.registercart);      //for postman
router.route('/login').post(authcontrollers.login);
router.route('/logincart').post(authcontrollers.logincart);
router.route("/user").get(authMiddleware,authcontrollers.user);
router.route('/contactus').post(authcontrollers.contactus); 

router.route('/getallcategoryaccordingstatus').get(authcontrollers.getAllCategoryAccordingStatus);
router.route('/getallsubcategoryaccordingstatus').get(authcontrollers.getAllSubCategoryAccordingStatus);
router.route('/getallsubcategorybycategoryidaccordingstatus/:id').get(authcontrollers.getAllSubCategoryByCategoryidAccordingStatus);
router.route('/getallcategoryimageslideraccordingstatus').get(authcontrollers.getAllCategoryImageSliderAccordingStatus);
router.route('/getallsubcategoryimageslideraccordingstatus').get(authcontrollers.getAllSubCategoryImageSliderAccordingStatus);


module.exports = router;
