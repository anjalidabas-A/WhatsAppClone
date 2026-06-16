import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import { useState } from "react";

function SignIn() {
  const mobileData = ["9876", "1234"];

  const [number, setNumber] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const checkNum = () => {
    if (mobileData.includes(number)) {
      navigate("/");
    } else {
      // alert("Invalid User");
      setError("Invalid Mobile Number");
      setNumber("");
    }
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInCard}>
        <h1>Welcome to VibeChat</h1>
        <p>Sign in to Open the App</p>

        <p>{error}</p>

        <input
          type="tel"
          placeholder="Enter Your Mobile Number"
          className={styles.signInInput}
          value={number}
          onChange={(e) => {setNumber(e.target.value); setError("");}}
        />

        <button className={styles.signInBtn} onClick={checkNum}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
