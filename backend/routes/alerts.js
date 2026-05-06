const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const url = `https://newsapi.org/v2/everything?q=disaster OR flood OR earthquake OR fire&apiKey=${process.env.NEWS_API_KEY}`;
    const news = await axios.get(url);
    res.json(news.data.articles);
  }catch(err){
    res.status(500).json({ message: "Error fetching alerts" });
  }
});

module.exports = router;