function ChatHeader({ selectedChat }) {
  return (
    <div className="chat-header">
      <div className="header-left">
        <div className="profile-img">{selectedChat[0]}</div>

        <div>
          <h3>{selectedChat}</h3>
          <p>Online/Offline</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
