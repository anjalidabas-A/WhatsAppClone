function Message({
  id,
  text,
  senderId,
  currentUserId,
  selectionMode,
  selectedMessages,
  setSelectedMessages,
}) {
  const messageType = senderId === currentUserId ? "sent" : "received";

  const isSelected = selectedMessages.includes(id);

  const handleClick = () => {
    if (!selectionMode) return;

    if (isSelected) {
      setSelectedMessages(
        selectedMessages.filter((messageId) => messageId !== id),
      );
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  return (
  <div
    className={`message ${messageType} ${isSelected ? "selected" : ""}`}
    onClick={handleClick}
  >
    {text}
  </div>
  );
}

export default Message;
