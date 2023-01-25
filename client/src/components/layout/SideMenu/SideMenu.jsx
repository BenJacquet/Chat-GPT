import React from 'react'
import { useState } from 'react'
import './SideMenu.css'

const SideMenu = (chatLog) => {
  const [prompt, setPrompt] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (prompt === "") return;
    setPrompt("");
    // await fetch("http://localhost:5000/edit/apikey", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({key: prompt}),
    //   });
    localStorage.setItem("apiKey", prompt);
  }

  return (
    <aside className="SideMenu">
      <p>Chat-GPT is a chatbot powered by OpenAI's GPT-3</p>
      <ul>
        <p>Guidelines :</p>
        <li>Get your API key from <a href="https://beta.openai.com/account/api-keys" target="_blank" rel="noreferrer">openAI</a></li>
        <hr />
        <li>Put it in the field below</li>
        <hr />
        <li>Start chatting with GPT-3 !</li>
      </ul>
      <ul>
        <p>Capabilities :</p>
        <li>Remembers what you said earlier in the conversation</li>
        <hr />
        <li>Trained to decline inappropriate requests</li>
        <hr />
        <li>Limited knowledge of world and events after 2021</li>
      </ul>
      <div className='FooterWrapper'>
        <div className='Footer'>
        <hr />
          <p>Please enter your API Key below</p>
          <form onSubmit={handleSubmit}>
            <input
            className="ChatInputAPI"
            value={prompt}
            type="password"
            onChange={(e) => setPrompt(e.target.value)}
            rows="1"></input>
          </form>
          <p>Ben's Chat-GPT</p>
        </div>
      </div>
    </aside>
  )
}

export default SideMenu
