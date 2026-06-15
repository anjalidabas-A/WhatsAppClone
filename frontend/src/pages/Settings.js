import style from "./Settings.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Settings() {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <div className={style.settings}>
      <div className={style.settingsHeader}>
        <h1>Settings</h1>
        <Link to="/" className={style.backBtn}>
          Back
        </Link>
      </div>

      <div className={style.profileSection}>
        <div className={style.profileImg}>A</div>

        <div>
          <h3>Anjali Dabas</h3>
          <p>Hello...I am using VibeChat</p>
        </div>
      </div>

      <div className={style.settingItem}>Account</div>
      <div className={style.settingItem}>Privacy</div>
      <div className={style.settingItem}>Notification</div>
      <div className={style.settingItem}>Chats</div>
      <div className={style.settingItem}>Appearance</div>
      <div className={style.settingItem}>Help</div>
      <div className={style.settingItem} onClick={() => setShowLogout(true)}>
        Logout
      </div>

      {showLogout && (
        <div className={style.logoutCard}>
          <div className={style.logoutDetails}>
            <h1>VibeChat</h1>
            <p>Are you sure you want to Logout?</p>
            <button
              className={style.cancelButton}
              onClick={() => setShowLogout(false)}
            >
              Cancel
            </button>
            <Link to="/signin" className={style.logoutButton}>
            Logout
            </Link>

          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
