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
  host: 'gpt_postgres_1',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

const connectToDB = async () => {
  try {
    await pgClient.connect();
  } catch (err) {
    console.log(err);
  }
};
connectToDB();

try {
  pgClient.on("connect", client => {
  pgClient
    .query("CREATE TABLE IF NOT EXISTS chats (id SERIAL PRIMARY KEY, message TEXT, sender TEXT, date TIMESTAMP)")
    .catch((err) => console.error(err));
});
} catch (err) {
  console.log(err)
}

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
  pgClient.query("SELECT * FROM chats", (err, table) => {
  res.json({
    data: table.rows
  })});
});

// write a function to get all the messages from the database and send them as an array of objects to the client


// POST MESSAGE TO DATABASE

app.post('/post/message', async (req, res) => {
  const {message} = req.body;
  try {
    const response = await pgClient.query("INSERT INTO chats (message, sender, date) VALUES ($1, $2, $3)", [message, "user", new Date()]);
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
  await pgClient.query("INSERT INTO chats (message, sender, date) VALUES ($1, $2, $3)", [response.data.choices[0].text.trim(), "gpt", new Date()]);
  res.json({
    data: response.data.choices[0].text.trim()
  });
 } catch (err) {
    await pgClient.query("INSERT INTO chats (message, sender, date) VALUES ($1, $2, $3)", ["Error: Please check your api key and try again.", "gpt", new Date()]);
    res.json({
      data: "Error: Please check your api key and try again."
    });
  }
});