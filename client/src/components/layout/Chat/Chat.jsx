import React from 'react'
import { useState, useRef, useEffect} from 'react'
import Message from '../Message/Message';

import './Chat.css'

const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [chatLog] = useState([]);

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatLog]);


  async function handleSubmit(e) {
    e.preventDefault();
    if (prompt === "") return;
    chatLog.push({sender : "user", message : prompt});
    setPrompt("");
    const response = await fetch("http://localhost:3030/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message: chatLog.map((message) => message.message).join(" ")}),
      });
    const data = await response.json();
    chatLog.push({sender : "gpt", message : data.data});
  }

  return (
    <section className="Chat">
      <div className="ChatLog">
        {chatLog.map((elem, index) => (
          <Message key={index} message={elem} />
        ))}
      </div>
      <div ref={messagesEndRef} />
      <div className="ChatInputWrapper">
        <form onSubmit={handleSubmit}>
          <input
          className="ChatInput"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="1"></input>
        </form>
      </div>
    </section>
  )
}

export default Chat