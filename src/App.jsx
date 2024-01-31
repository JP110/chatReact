import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import MessageList from "./MessagesList";
import Footer from "./Footer";
import { chatAPI } from "./chats";
const messageList = [
  { isSent: false, text: "Salut ca va?" },
  { isSent: true, text: "bien et toi?" },
  { isSent: true, text: "réponds !" },
  { isSent: true, text: "je vais le dire a JC" },
  { isSent: false, text: "Tout mais pas ça!" },
];

function App() {
 
  const [messages, setMessages] = useState(messageList);

  const sendMessage = (newmsg) => {
    const newMsg = {isSent: true, text: newmsg}
    setMessages([...messages,newMsg])
    chatAPI.sendMessage("",newMsg)
  }

  // const receiveMessage = (newmsg) => {
  //   newmsg.text.isSent = false
  //   setMessages([...messages,newmsg.text])
  // }

  // chatAPI.connect(receiveMessage)


  useEffect(() => {
    const receiveMessage = (newmsg) => {
      newmsg.text.isSent = false
      setMessages([...messages,newmsg.text])
    }
    chatAPI.connect(receiveMessage)
    return() => {
      chatAPI.disconnect()
    }
  }, [messages])
  return (
    <main className="app">
        <Header title="Jérôme PUCH"/>
        <MessageList messages={messages} />
        <Footer sendMessage = {sendMessage}/>
    </main>
  );
}

export default App;
