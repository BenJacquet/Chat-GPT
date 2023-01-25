import React from 'react'
import { useState, useEffect} from 'react'
import Message from '../Message/Message';

import './Chat.css'

const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [chatLog, setChatLog] = useState([]);

  async function getMessages() {
    await fetch("http://localhost:5000/get/messages")
    .then(response => response.json())
    .then(data => setChatLog(data.data || []));
  }

  useEffect(() => {
    getMessages();
  }, []);

  async function clearChat() {
    const response = await fetch("http://localhost:5000/clear/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (prompt === "") return;
    const input = prompt;
    chatLog.push({sender : "user", message : input});
    const responsePost = await fetch("http://localhost:5000/post/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message: input, sender: "user"}),
    });
    setPrompt("");
    setIsActive(false);
    const response = await fetch("http://localhost:5000/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message: chatLog.map((message) => message.message).join(" ")}),
      });
    const data = await response.json();
    chatLog.push({sender : "gpt", message : data.data});
    setIsActive(true);
  }

  return (
    <section className="Chat">
      <div className="ChatLog">
        {chatLog.map((elem, index) => (
          <Message key={index} message={elem} />
        ))}
      </div>
      <div className="ChatInputWrapper">
        <button className="ClearChat" onClick={clearChat}>Clear Chat</button>
        <form onSubmit={handleSubmit}>
          <input
          className="ChatInput"
          disabled={!isActive}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="1"></input>
        </form>
      </div>
    </section>
  )
}

export default Chat