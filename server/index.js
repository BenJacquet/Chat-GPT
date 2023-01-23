const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const port = 3030;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
const { response } = require("express");
app.use(cors());

const exportVar = (name, value) => {
  process.env[name] = value;
};

app.post('/prompt', async (req, res) => {
  const {message} = req.body;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 2048,
    temperature: 0,
  });
  res.json({
    data: response.data.choices[0].text.trim()
  }); } catch (err) {
    res.json({
      data: "Error: Please check your api key and try again."
    });
  }
});

app.post('/edit/apikey', async (req, res) => {
  const key = req.body.key;
  exportVar("OPENAI_API_KEY", key);
  res.json({
    data: "OK"
  })
});

app.get('/get/chats', async (req, res) => {
  res.json({
    data: []
  })
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});