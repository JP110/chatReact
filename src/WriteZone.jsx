// WriteZone.js
import React,  {useRef} from 'react';
import './WriteZone.css';

function WriteZone({sendMessage}) {
  const textareaRef = useRef();
const handleSendMessage = () => {
 sendMessage(textareaRef.current.value)
}

  return (
    <div className="writeZone">
      <textarea ref={textareaRef} placeholder="Message"></textarea>
      <button onClick={handleSendMessage} >Envoyer</button>
    </div>
  );
}

export default WriteZone;
