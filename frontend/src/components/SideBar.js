import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ChatItem from "./ChatItem";
import settingIcon from "../assets/settingsIcon.svg";

function SideBar({ setSelectedChat }) {
  const [chats, setChats] = useState(["Anjali Dabas", "Rachit Dabas", "Ankit Brother"]);

  const [search, setSearch] = useState("");

  const [showAddContact, setShowAddContact] = useState(false);

  const [newContact, setNewContact] = useState("");

  const filterChats = chats.filter((chat) =>
    chat.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddContact = () => {
    if (newContact.trim() === "") return;

    setChats((prevChats) => [...prevChats, newContact]);
    setNewContact("");
    setShowAddContact(false);
  };

  return (
    <div className="sidebar">
      <div className="profile-header">
        <div className="app-name">VibeChat</div>
        <Link to="/settings">
          <img src={settingIcon} alt="settings" className="setting-icon" />
        </Link>
      </div>

      <SearchBar search={search} handleSearchChange={handleSearchChange} />

      <button className="add-contact-btn" onClick={() => setShowAddContact(!showAddContact)}>Add Contact</button>

      {showAddContact && (
        <div className="add-contact-box">                  
          <input type="text" placeholder="Enter Contact Name" className="add-contact-input" value={newContact} onChange={(e) => setNewContact(e.target.value)}/>
          <button className="save-contact-btn" onClick={handleAddContact}>Save</button>
        </div>
      )}

      {filterChats.map((chat, index) => (
        <ChatItem
          key={index}
          name={chat}
          onClick={() => setSelectedChat(chat)}
        />
      ))}
    </div>
  );
}

export default SideBar;
