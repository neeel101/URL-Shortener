const express = require("express");
const {handleStaticResponse} = require("../controllers/url")
const router = express.Router();

router.get("", handleStaticResponse);

module.exports = router;
