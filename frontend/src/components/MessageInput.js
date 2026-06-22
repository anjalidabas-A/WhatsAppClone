import { useState } from "react";

function MessageInput({ selectedChat, messages, setMessages }) {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;
    
    if(!selectedChat) {
      alert("Please select a chat first");
      return;
    }
    
    try {
      const response = await fetch("http://127.0.0.1:8000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_name: selectedChat,
          text: input,
          message_type: "sent",   
        }),
      });

      const data = await response.json();

      if (data.successful) {
        setMessages((prev) => [...prev, { id: Date.now(), chat_name: selectedChat, text: input, message_type: "sent", },]);
        setInput("");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="Type message Here!"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default MessageInput;
