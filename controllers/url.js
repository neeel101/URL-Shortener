const shortid = require("shortid");
const { urlModel } = require("../model/url");
const express = require("express");
const app = express();

async function handleCreateShortUrl(req, res) {
  const body = req.body;
  if (!body?.url) res.json({ error: "url required" });

  const shortID = shortid(5);
  await urlModel.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  res.redirect("/");
}

async function handleUserAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await urlModel.findOne({ shortId });

  return res.json({ numberOfCLicks: entry.visitHistory.length });
}

async function handleRedirectRequest(req, res) {
  const shortId = req.params.shortid;

  const entry = await urlModel.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    } 
  );

  res.redirect(entry.redirectUrl);
}

async function handleStaticResponse(req, res) {
  const urls = await urlModel.find({});

  return res.render("home", { urls });
}

module.exports = {
  handleCreateShortUrl,
  handleUserAnalytics, 
  handleRedirectRequest,
  handleStaticResponse,
};
