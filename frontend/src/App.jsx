import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState , useEffect } from "react";
import "./App.css";
import Settings from "./pages/Settings";
import SideBar from "./components/SideBar";
import ChatHeader from "./components/ChatHeader";
import Message from "./components/Message";
import MessageInput from "./components/MessageInput";
import SignIn from "./pages/SignIn";
import Help from "./pages/Help";

function App() {
  const [messages, setMessages] = useState([]);

  const [selectedChat, setSelectedChat] = useState("");

  useEffect(()=> {
    if(!selectedChat) {
      setMessages([]);
      return;
    }

    const fetchMessages = async() => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/messages/${selectedChat}`);
        
        const data = await response.json();

        if (data.successful) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <SideBar setSelectedChat={setSelectedChat} />

            <div className="chat-section">
              <ChatHeader selectedChat={selectedChat} />

              <div className="messages">
                {messages.map((msg, index) => (
                  <Message key={msg.id || index} text={msg.text} type={msg.message_type} />
                ))}
              </div>

              <MessageInput selectedChat={selectedChat} messages={messages} setMessages={setMessages} />
            </div>
          </div>
        }
      />

      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
