import React from 'react'
import GptIcon from '../../svg/GptIcon'
import UserIcon from '../../svg/UserIcon'

import './Message.css'

const Message = ({message}) => {
  const avatar = message.sender === 'user' ? <UserIcon /> : <GptIcon />;
  const className = message.sender === 'user' ? "ChatMessageWrapper User" : "ChatMessageWrapper Gpt";
  return (
    <div className={className}>
    <div className="ChatMessage">
      <div className="MessageAvatar">
        <div className="MessageAvatarSvg">
          {avatar}
        </div>
      </div>
      <div className="MessageContent">
        {message.message}
      </div>
    </div>
  </div>
  )
}

export default Message