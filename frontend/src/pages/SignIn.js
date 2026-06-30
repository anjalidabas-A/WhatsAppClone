import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import { useState } from "react";

function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const checkNum = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
        }),
      });

      const data = await response.json();

      if (data.successful) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError("Invalid Mobile Number");
        setPhoneNumber("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInCard}>
        <h1>Welcome to VibeChat</h1>
        <p>Sign in to Open the App</p>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="tel"
          placeholder="Enter Your Mobile Number"
          className={styles.signInInput}
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setError("");
          }}
        />

        <button className={styles.signInBtn} onClick={checkNum}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
