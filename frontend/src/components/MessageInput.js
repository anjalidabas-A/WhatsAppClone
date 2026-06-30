import { useState } from "react";

function MessageInput({ currentUser, fetchMessages, selectedChat }) {
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
          sender_id: currentUser.id,
          receiver_id: selectedChat.id,
          text: input,
        }),
      });

      const data = await response.json();

      if (data.successful) {
        setInput("");
        fetchMessages();  
      }
    } catch (error) {
      console.log("Error sending message:", error);
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
