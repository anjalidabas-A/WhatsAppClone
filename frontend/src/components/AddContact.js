import { useState } from "react";

function AddContact({currentUser, fetchContacts}) {
  const [showAddContact, setShowAddContact] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

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

  return (
    <>
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
    </>
  );
}

export default AddContact;
