

function ChatHeader({selectedChat}){

  const initialAlpha = selectedChat[0];

  return(
    <div className="chat-header">
      <div className="header-left">
        <div className="profile-img">{initialAlpha}</div>

        <div>
          <h3>{selectedChat}</h3>
          <p>Online/Offline</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;