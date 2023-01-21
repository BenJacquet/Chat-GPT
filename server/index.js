// 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

const { Configuration, OpenAIApi } = require("openai");
const express = require('express');


const configuration = new Configuration({
    organization: "org-ozjDrl9iyYrszmdQ88nuUNa1",
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

async function callApi(){
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say something funny",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
  return (response.data)
}

// create a simple express api that calls the abobe function
const app = express();
const port = 3030;

app.get('/', (req, res) => {
  res.json({
    data: "root"
  })
});

app.get('/complete', async (req, res) => {
  //call callApi function and return the response as a json object
  const response = await callApi();
  res.json({
    data: response
  })
});

app.get('/ice', (req, res) => {
  res.json({
    data: "ice"
  })
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});