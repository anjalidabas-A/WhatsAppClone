import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Settings from "./pages/Settings";
import SideBar from "./components/SideBar";
import ChatHeader from "./components/ChatHeader";
import Message from "./components/Message";
import MessageInput from "./components/MessageInput";
import SignIn from "./pages/SignIn";
import Help from "./pages/Help";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [selectedChat, setSelectedChat] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (!currentUser || !selectedChat) {
      setMessages([]);
      return;
    }
    fetchMessages();
  }, [selectedChat, currentUser]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/messages/${currentUser.id}/${selectedChat.id}`,
      );

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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <SideBar
              currentUser={currentUser}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />

            <div className="chat-section">
              <ChatHeader selectedChat={selectedChat} />

              <div className="messages">
                {messages.map((msg) => (
                  <Message
                    key={msg.id}
                    text={msg.text}
                    SenderId={msg.sender_id}
                    currentUserId={currentUser?.id}
                  />
                ))}
              </div>

              <MessageInput
                currentUser={currentUser}
                selectedChat={selectedChat}
                setMessages={setMessages}
                fetchMessages={fetchMessages}
              />
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
