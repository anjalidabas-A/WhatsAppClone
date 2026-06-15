import styles from "./SignIn.module.css";
import { useState } from "react";

function SignIn() {
  const mobileData = ["9876", "1234"];

  const [number, setNumber] = useState("");

  const checkNum = () => {
    if (mobileData.includes(number)) {
      console.log("valid user");
    } else {
      console.log("invalid user");
    }
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInCard}>
        <h1>Welcome to VibeChat</h1>
        <p>Sign in to Open the App</p>

        <input
          type="text"
          placeholder="Enter Your Mobile Number"
          className={styles.signInInput}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <button className={styles.signInBtn} onClick={checkNum}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
