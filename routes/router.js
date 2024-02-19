const controller = require("../contoller/userController")
const express = require("express")
const models = require("../models/Userschema")
const middleware = require("../middleware")

const router = express.Router()


router.post("/register", controller.Register)

router.post("/login", controller.login)

router.get("/myprofile", middleware , controller.dashboard)

router.put("/update/:id", controller.updateUser)

router.get("/singleuser/:id", controller.singleUser)

router.get("/Allusers", controller.usersAll)

router.delete("/delete/:id", controller.deleteUser)

 
module.exports = router