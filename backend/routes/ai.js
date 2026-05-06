const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/predict', async (req, res) => {
  const { city } = req.body;
  try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const weather = await axios.get(url);
    const temp = weather.data.main.temp;
    const condition = weather.data.weather[0].main;

    let disaster = "Normal";
    let advice = "Stay Safe";

    if(condition.toLowerCase().includes("rain")){
      disaster = "Flood Risk";
      advice = "Move to higher ground immediately";
    }
    if(temp > 40){
      disaster = "Fire Risk";
      advice = "Avoid heat & flammable materials";
    }

    res.json({ city, temp, condition, disaster, advice });
  }catch(err){
    res.status(500).json({ message: "Weather API Error" });
  }
});

router.get('/news', async (req, res) => {
  try{
    const url = `https://newsapi.org/v2/everything?q=disaster OR flood OR fire OR earthquake&apiKey=${process.env.NEWS_API_KEY}`;
    const news = await axios.get(url);
    res.json(news.data.articles);
  }catch(err){
    res.status(500).json({ message: "News API Error" });
  }
});

router.post('/chat', async (req,res)=>{
  const { message } = req.body;
  try{
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a disaster safety assistant. Give short, clear safety advice." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  }catch(err){
    res.status(500).json({ reply: "AI Error" });
  }
});

module.exports = router;