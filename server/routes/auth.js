const express = require("express");
const router = express.Router();
const {authCheck} =require("../middlewares/auth");
const {login,signup} = require("../controller/auth");


router.get("/login",authCheck,login);

router.get("/signup",authCheck,signup);

module.exports = router; 