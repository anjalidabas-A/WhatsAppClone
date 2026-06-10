// import logo from './logo.svg';
import React from "react";
import { useState } from "react";
import './App.css';

import SideBar from "./components/SideBar";
import ChatHeader from "./components/ChatHeader";
import Message from "./components/Message";
import MessageInput from "./components/MessageInput";

function App(){
  const messages = [{text: 'Hello' , type:'received'},{text:'hey, how r u?', type:'sent'}];
  
  const [selectedChat , setSelectedChat] = useState("");

  return(
    <div className="app">

      <SideBar setSelectedChat={setSelectedChat}/>

      <div className="chat-section">

        <ChatHeader selectedChat={selectedChat}/>

        <div className="messages">
          {messages.map((msg, index) =>(<Message key={index} text={msg.text} type={msg.type}/>))}
        </div>

        <MessageInput/>
      </div>
    </div>
  );
}

export default App;

// fgkjfnggfjhnfgk

