import React from 'react'
import { useState } from 'react'
import './SideMenu.css'

const SideMenu = () => {
  const [prompt, setPrompt] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (prompt === "") return;
    setPrompt("");
    await fetch("http://localhost:3030/edit/apikey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({key: prompt}),
      });
  }

  function newChat() {
    console.log('Placeholder for Chat')
  }

  return (
    <aside className="SideMenu">
      <div className="NewChat">
        <div className="SideMenuButton" onClick={newChat}>
          <span>+</span>
          New Chat
        </div>
      <hr />
      </div>
      <div className="SideMenuChatContainer">
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      <div className="SideMenuButton" onClick={newChat}>
        <span>-</span>
        Placeholder for Chat
      </div>
      </div>
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
