const express = require('express');
const router = express.Router();
const { Url } = require('../models/url');
const shortId = require('shortid');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortId.generate();
    await Url.create({ originalUrl, shortUrl });
    res.redirect(`/success/${shortUrl}`);
});

router.get('/success/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ where: { shortUrl } });
    if (url) {
        res.render('success', { originalUrl: url.originalUrl, shortUrl: url.shortUrl });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
