const express = require("express");
const router = express.Router();
const {createSession, getSessions} = require("../controller/session");


router.post("/create",createSession);

router.get("/get",getSessions);

module.exports = router; 