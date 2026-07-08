function ChatHeader({ selectedChat, selectionMode, selectedCount, setSelectionMode, setSelectedMessages, deleteSelectedMessages, }) {
  return (
    <div className="chat-header">
      <div className="header-left">
        <div className="profile-img">{selectedChat ? selectedChat.name[0]: ""}</div>

        <div>
          {selectionMode ? (
            <h3>{selectedCount} Selected</h3>
          ) : (
            <>
              <h3>{selectedChat ? selectedChat.name : "Select a Chat"}</h3>
              <p>Online/Offline</p>
            </>
          )}
        </div>
      </div>

      {selectedChat && (
        <div className="header-right">
          {selectionMode ? (
            <>
              <button onClick={deleteSelectedMessages}>Trash Bin</button>

              <button onClick={() => {setSelectionMode(false); setSelectedMessages([]);}}>cross</button>
            </>
          ) : (
            <button onClick={() => {setSelectionMode(true)}}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatHeader;
