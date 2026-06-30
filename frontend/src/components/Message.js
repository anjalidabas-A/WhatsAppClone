function Message({ text, senderId, currentUserId }) {
  const messageType = senderId === currentUserId ? "sent" : "received";

  return <div className={`message ${messageType}`}>{text}</div>;
}

export default Message;
