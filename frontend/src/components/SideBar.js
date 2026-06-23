import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ChatItem from "./ChatItem";
import settingIcon from "../assets/settingsIcon.svg";

function SideBar({ setSelectedChat }) {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:8000/contacts");
    const data = await response.json();

    const contactNames = data.map((contact) => contact.name);
    setChats(contactNames);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddContact = async () => {
    if (newContact.trim() === "") return;

    try {
      const response = await fetch("http://127.0.0.1:8000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newContact }),
      });
      const data = await response.json();

      if (data.successful) {
        setChats((prevChats) => [...prevChats, data.contact.name]);
        setNewContact("");
        setShowAddContact(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding contact:", error);
    }
  };

  const filterChats = chats.filter((chat) =>
    chat.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="sidebar">
      <div className="profile-header">
        <div className="app-name">VibeChat</div>
        <Link to="/settings">
          <img src={settingIcon} alt="settings" className="setting-icon" />
        </Link>
      </div>

      <SearchBar search={search} handleSearchChange={handleSearchChange} />

      <button
        className="add-contact-btn"
        onClick={() => setShowAddContact(!showAddContact)}
      >
        Add Contact
      </button>

      {showAddContact && (
        <div className="add-contact-box">
          <input
            type="text"
            placeholder="Enter Contact Name"
            className="add-contact-input"
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
          />
          <button className="save-contact-btn" onClick={handleAddContact}>
            Save
          </button>
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
