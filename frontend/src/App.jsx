import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Settings from "./pages/Settings";

import SideBar from "./components/SideBar";
import ChatHeader from "./components/ChatHeader";
import Message from "./components/Message";
import MessageInput from "./components/MessageInput";

function App() {
  const messages = [
    { text: "Hello", type: "received" },
    { text: "hey, how r u?", type: "sent" },
  ];

  const [selectedChat, setSelectedChat] = useState("");

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
                  <Message key={index} text={msg.text} type={msg.type} />
                ))}
              </div>

              <MessageInput />
            </div>
          </div>
        }
      />

      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;

// fgkjfnggfjhnfgk
