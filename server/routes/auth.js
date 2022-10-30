const express = require("express");
const router = express.Router();
const {authCheck} =require("../middlewares/auth");
const {login,signup} = require("../controller/auth");


router.post("/login",authCheck,login);

router.post("/signup",authCheck,signup);

module.exports = router; 