function ChatItem({ name, number, selected, onClick }) {
  return (
    <div className={`chat-item ${selected ? "selected-chat" : ""}`} onClick={onClick}>
      <div className="profile-img">{name[0]}</div>

      <div>
        <h4>{name}</h4>
        <p>{number}</p>
      </div>
    </div>
  );
}

export default ChatItem;

// {name ? name[0].toUpperCase() : "?")}