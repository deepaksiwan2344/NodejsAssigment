const express =  require("express");
const router = express.Router();
const {createNewpost,getAllCreatedPost } = require("./controller");
const {verifyToken, varifyTokenAndUser} = require("../../middleware/auth")


router.post("/createNewpost", createNewpost,verifyToken)
router.get("/getAllCreatedPost", getAllCreatedPost,verifyToken)


module.exports = router;