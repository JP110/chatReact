import React from 'react';
import './Message.css';

function Message({ isSent, text }) {
  return (
    <div className={`message${isSent ? ' message-sent' : ''}`}>
      <div className="message_text">{text}</div>
      <div className="message_infos">✓</div>
    </div>
  );
}

export default Message;