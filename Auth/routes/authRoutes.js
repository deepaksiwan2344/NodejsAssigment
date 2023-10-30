const express =  require("express");
const router = express.Router();
const {UserSignup, userlogin } = require("../controller");
const {verifyToken} = require("../../middleware/auth")


router.post("/UserSignup", UserSignup)
router.post("/userlogin", userlogin)



module.exports = router;