const express = require("express");
const router = express.Router();
const { Url } = require("../models/url");
const shortId = require("shortid");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/shorten", async (req, res) => {
  let { originalUrl } = req.body;

  if (
    !originalUrl.startsWith("http://") &&
    !originalUrl.startsWith("https://")
  ) {
    originalUrl = `https://${originalUrl}`;
  }

  const shortUrl = shortId.generate();
  await Url.create({ originalUrl, shortUrl });
  res.redirect(`/success/${shortUrl}`);
});

router.get("/success/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ where: { shortUrl } });

  url
    ? res.render("success", {
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
      })
    : res.redirect("/");
});

router.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ where: { shortUrl } });

  url
    ? res.redirect(url.originalUrl)
    : res.status(404).send("URL não encontrada");
});

module.exports = router;