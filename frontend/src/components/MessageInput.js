import { useState } from "react";


function MessageInput({ messages , setMessages }) {
  const [ input , setInput ] = useState("");

  const sendMessage = () => {
    setMessages([...messages,{text: input, type: "sent",},]);
    setInput("");
  };
  return (
    <div className="input-area">
      <input type="text" placeholder="Type message Here!" value={input} onChange={(e) => setInput(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default MessageInput;
