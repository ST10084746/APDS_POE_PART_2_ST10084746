const express = require ("express");
const User = require("../models/userModel.js");
const authConroller = require("../routeControllers/authController.js")

const router = express.Router()

router.post("/signup", authConroller.signup)

router.post('/login', authConroller.login)
   



module.exports= router