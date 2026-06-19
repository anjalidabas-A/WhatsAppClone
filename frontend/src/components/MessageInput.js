import { useState } from "react";

function MessageInput({ messages, setMessages }) {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { text: input, type: "sent" }]);
    setInput("");
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
