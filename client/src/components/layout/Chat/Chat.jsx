import React from 'react'
// import { setState, useState } from 'react'

import './Chat.css'
import GptIcon from '../../svg/GptIcon'
import UserIcon from '../../svg/UserIcon'





const Chat = () => {
  // let [prompt, setPrompt] = useState('');
  // const [Chat, setChat] = useState([]);

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   setPrompt("");
  // }

  return (
    <section className="Chat">
      <div className="ChatLog">
        <div className='ChatMessageWrapper User'>
          <div className="ChatMessage">
            <div className="MessageAvatar">
              <div className="MessageAvatarSvg">
                <UserIcon />
              </div>
            </div>
            <div className="MessageContent">
              design a very simple express api with a route that returns the message "hello"
            </div>
          </div>
        </div>
        <div className='ChatMessageWrapper Gpt'>
          <div className="ChatMessage">
            <div className="MessageAvatar">
              <div className="MessageAvatarSvg">
                <GptIcon />
              </div>
            </div>
            <div className="MessageContent">
             Here is an example of a very simple Express API with a route that returns the message "hello":
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <form onSubmit={handleSubmit}> */}
          <input
          className="ChatInput"
          value={prompt}
          // onChange={() => setPrompt(prompt) = e.target.value}
          rows="1"></input>
        {/* </form> */}
      </div>
    </section>
  )
}

export default Chat