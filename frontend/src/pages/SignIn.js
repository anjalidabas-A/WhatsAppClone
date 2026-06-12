function SignIn(){
  return(
    <div className="signin-container">
      <div className="signin-card">
        <h1>VibeChat</h1>
        <p>Sign in to Open the App</p>

        <input type="text" placeholder="Username" className="signin-input"/>
        <input type="password" placeholder="Password" className="signin-input"/>

        <button className="signin-btn">Sign-In</button>
       
      </div>
    </div>
  );
}

export default SignIn;