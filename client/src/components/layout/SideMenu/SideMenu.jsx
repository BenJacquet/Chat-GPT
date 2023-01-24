import React from 'react'
import { useState } from 'react'
import './SideMenu.css'

const SideMenu = (chatLog) => {
  const [prompt, setPrompt] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (prompt === "") return;
    setPrompt("");
    await fetch("http://localhost:5000/edit/apikey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({key: prompt}),
      });
  }

  return (
    <aside className="SideMenu">
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
