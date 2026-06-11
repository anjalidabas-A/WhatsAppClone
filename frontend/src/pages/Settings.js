import './Settings.css'
import { Link } from "react-router-dom";

function Settings(){
  return(
    <div className="settings">
      <div className="settings-header">      
        <h1>Settings</h1>
        <Link to="/" className='back-btn'>Back</Link>
      </div>

      <div className="profile-section">
        <div className="profile-img">A</div>

        <div>
          <h3>Anjali Dabas</h3>
          <p>Hello...I am using VibeChat</p>
        </div>
      </div>

      <div className="setting-item">Account</div>
      <div className="setting-item">Privacy</div>
      <div className="setting-item">Notification</div>
      <div className="setting-item">Chats</div>
      <div className="setting-item">Appearance</div>
      <div className="setting-item">Help</div>
      <div className="setting-item  logout">Logout</div>

    </div>
  );
}

export default Settings;