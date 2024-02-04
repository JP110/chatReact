import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import MessageList from "./MessagesList";
import Footer from "./Footer";
import io from "socket.io-client";
import Login from "./Login";

const socket = io("http://localhost:3001");

const initialConversations = {}; // Un objet pour stocker les messages par conversation

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [conversations, setConversations] = useState(initialConversations);

  const handleLogin = (userName) => {
    setCurrentUser(userName);
    socket.emit("login", userName);
  };

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);
    // Créez la clé pour la conversation privée (par exemple, John Doe-Jane Doe)
    const conversationKey = [currentUser, selectedUser].sort().join("-");
    setConversations((prevConversations) => ({
      ...prevConversations,
      [conversationKey]: prevConversations[conversationKey] || [],
    }));
  };

  const sendMessage = (newmsg) => {
    console.log("message envoyé")
    socket.emit("message", {
      text: newmsg,
      isSent: true,
      sender: currentUser,
      recipient: selectedUser,
    });
  };

  useEffect(() => {
    socket.on("message", (newmsg) => {
      const conversationKey = [newmsg.sender, newmsg.recipient].sort().join("-");
      setConversations(prevConversations => ({
        ...prevConversations,
        [conversationKey]: [
          ...(prevConversations[conversationKey] || []),
          { ...newmsg, isSent: newmsg.sender === currentUser },
        ],
      }));
    });
    socket.on("userList", (users) => {
      setUserList(users.filter((user) => user !== currentUser));
    });
  
    return () => {
      socket.off("message");
      socket.off("userList");
    };
  }, [currentUser]);
  return (
    <main className="app">
      {currentUser ? (
        <>
          <Header title={`${currentUser}`} userList={userList} onUserSelect={handleUserSelect} />
          <MessageList messages={conversations[[currentUser, selectedUser].sort().join("-")]}/>
          <Footer sendMessage={sendMessage} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </main>
  );
}

export default App;
