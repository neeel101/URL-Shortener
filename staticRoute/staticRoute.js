const express = require("express");
const {handleStaticResponse} = require("../controllers/url")
const router = express.Router();

router.get("/", handleStaticResponse); 

router.get("/signup", (req, res) => {
    res.render("signup")    
})
router.get("/login", (req, res) => {
    res.render("login")
})
module.exports = router;
