
function ChatItem({name , onClick}){
  return(
    <div className="chat-item" onClick={onClick}>
      <div className="profile-img">
        {name[0]}
      </div>

      <div>
        <h4>{name}</h4>
        <p>Last message...</p>
      </div>
    </div>
  );
}

export default ChatItem;