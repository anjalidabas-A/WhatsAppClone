import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ChatItem from "./ChatItem";
import settingIcon from "../assets/settingsIcon.svg";

function SideBar({ currentUser, selectedChat, setSelectedChat }) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

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

  const handleAddContact = async () => {
    if (!contactName || !contactNumber) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner_id: currentUser.id,
          contact_name: contactName,
          contact_number: contactNumber,
        }),
      });
      const data = await response.json();

      if (data.successful) {
        fetchContacts();
        setContactName("");
        setContactNumber("");
        setShowAddContact(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error adding contact:", error);
    }
  };

  const filterContacts = contacts.filter((contact) =>
    contact.contact_name.toLowerCase().includes(search.toLowerCase()),
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

      <div className="current-user">
        <h3>{currentUser?.name}</h3>
        <p>{currentUser?.phone_number}</p>
      </div>

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
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="add-contact-btn"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <button className="save-contact-btn" onClick={handleAddContact}>
            Save
          </button>
        </div>
      )}

      {filterContacts.map((contact) => (
        <ChatItem
          key={contact.id}
          name={contact.contact_name}
          number={contact.contact_number}
          selected={selectedChat?.id === contact.id}
          onClick={() =>
            setSelectedChat({
              id: contact.id,
              name: contact.contact_name,
              phone_number: contact.contact_number,
            })
          }
        />
      ))}
    </div>
  );
}

export default SideBar;
