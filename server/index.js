const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const port = 5000;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
const { response } = require("express");
app.use(cors());


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

// POSTGRES CLIENT SETUP

const { Pool } = require('pg');
const pgClient = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

pgClient.on("connect", client => {
  client
    .query("CREATE TABLE IF NOT EXISTS chats (id SERIAL PRIMARY KEY, message TEXT, sender TEXT, date TIMESTAMP)")
    .catch((err) => console.error(err));
});

// API KEY SETUP IN ENVIRONMENT

const exportVar = (name, value) => {
  process.env[name] = value;
};

app.post('/edit/apikey', async (req, res) => {
  const key = req.body.key;
  exportVar("OPENAI_API_KEY", key);
  res.json({
    data: "OK"
  })
});

// GET ALL MESSAGES FROM DATABASE

app.get('/get/messages', async (req, res) => {
  try {
    const response = await pgClient.query("SELECT * FROM chats");
  res.json({
    data: response.rows
  })
  } catch (err) {
    console.log(err)
    res.json({
      data: err
    })
  }
});

// POST MESSAGE TO DATABASE

app.post('/post/message', async (req, res) => {
  const {message} = req.body;
  try {
    const response = await pgClient.query("INSERT INTO chats (message, sender, date) VALUES ($1, $2, $3)", [message.message, message.sender, new Date()]);
  res.json({
    data: response
  })
  } catch (err) {
    console.log(err)
    res.json({
      data: err
    })
  }
});

// CLEAR MESSAGES FROM DATABASE

app.post('/clear/messages', async (req, res) => {
  try {
    const response = await pgClient.query("DELETE FROM chats");
  res.json({
    data: response
  })
  } catch (err) {
    console.log(err)
    res.json({
      data: err
    })
  }
});

// OPENAI PROMPT REQUEST

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
