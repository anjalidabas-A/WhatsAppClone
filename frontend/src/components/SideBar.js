import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ChatItem from "./ChatItem";
import AddContact from "./AddContact";
import settingIcon from "../assets/settingsIcon.svg";

function SideBar({ currentUser, selectedChat, setSelectedChat, setChatId }) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/contacts/${currentUser.id}`,
      );
      const data = await response.json();
      if (data.successful) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.log("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchContacts();
    }
  }, [currentUser]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filterContacts = contacts.filter((contact) =>
    contact.contact_name.toLowerCase().includes(search.toLowerCase()),
  );

  const openChat = async (contact) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user1: currentUser.id,
          user2: contact.id,
        }),
      });

      const chat = await response.json();

      setSelectedChat({
        id: contact.id,
        name: contact.contact_name,
        phone_number: contact.contact_number,
      });
      setChatId(chat.chat_id);
    } catch (error) {
      console.log("Error:", error);
    }
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

      <div className="current-user">
        <h3>{currentUser?.name}</h3>
        <p>{currentUser?.phone_number}</p>
      </div>

      <AddContact currentUser={currentUser} fetchContacts={fetchContacts}/>

      {filterContacts.map((contact) => (
        <ChatItem
          key={contact.id}
          name={contact.contact_name}
          number={contact.contact_number}
          selected={selectedChat?.id === contact.id}
          onClick={() => openChat(contact)}
        />
      ))}
    </div>
  );
}

export default SideBar;
