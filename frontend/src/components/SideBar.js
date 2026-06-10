import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ChatItem from "./ChatItem";
import settingIcon from "../assets/settingsIcon.svg"

function SideBar({setSelectedChat}){
  const chats = ["Anjali Dabas", "Rachit Dabas",'Ankit Brother'];

  const [search, setSearch] = useState("");

  const filterChats = chats.filter((chat)=> chat.toLowerCase().includes(search.toLowerCase()));
  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return(
    <div className="sidebar">
      <div className="profile-header">
        <div className="app-name">VibeChat</div>
        {/* <div className="setting-icon">Setting</div> */}
        <Link to="/settings">
          <img src={settingIcon} alt="settings" className="setting-icon"/>
        </Link>
      </div>

    <SearchBar search={search} handleSearchChange={handleSearchChange}/>

  {filterChats.map((chat, index)=> (
    <ChatItem key={index} name={chat} onClick={()=> setSelectedChat(chat)}/>)
  )}

  </div>
  );
}

export default SideBar;
