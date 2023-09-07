const express = require("express");
const router = express.Router();

const {
  handleCreateShortUrl,
  handleUserAnalytics,
  handleRedirectRequest,
} = require("../controllers/url");

router.post("/", handleCreateShortUrl);
router.get("/analytics/:shortId", handleUserAnalytics);
router.get("/:shortid", handleRedirectRequest);
module.exports = router; 
