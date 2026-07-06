import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";

function SignUp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone_number: phoneNumber,
          password: password,
        }), 
      });

      const data = await response.json();

      if (data.successful) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        navigate("/");
        alert(data.message)
      } else {
        setError(data.message);
      }

    } catch (error) {
    console.log(error);
  } 
  };
  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInCard}>
        <h1>Welcome to VibeChat</h1>
        <p>Create your VibeChat Account</p>

        {error && <p className={styles.error}>{error}</p>}

        <input 
          type="text" 
          placeholder="Enter your name here"
          className={styles.signInInput}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />

        <input 
          type="tel" 
          placeholder="Enter your Mobile Number here"
          className={styles.signInInput}
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setError("");
          }}
        />

        <input 
          type="password" 
          placeholder="Set Your Password"
          className={styles.signInInput}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        <button className={styles.signInBtn} onClick={createAccount}>
           Submit
        </button>

        <Link to="/signin">Already have an Account?</Link>

      </div>

    </div>
  )
}

export default SignUp;