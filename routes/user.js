const {handleUserSignUp, handleUserLogin} = require("../controllers/user")
const express = require("express");
const userRouter = express.Router();
userRouter.post("/", handleUserSignUp);
userRouter.post("/login", handleUserLogin)
module.exports = {userRouter }   