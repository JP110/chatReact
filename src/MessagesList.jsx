import React from 'react';
import Message from './Message';
import './MessagesList.css'

function MessageList({ messages }) {
  return (
    <div className="app_content">
      {messages.map((message, index) => (
        <Message key={index} isSent={message.isSent} text={message.text} />
      ))}
    </div>
  );
}

export default MessageList;