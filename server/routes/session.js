const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/auth");
const {createSession, getSessions} = require("../controller/session");


router.post("/create",protect, createSession);

router.get("/get", protect, getSessions);

module.exports = router; 