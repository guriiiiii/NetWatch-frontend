import { useContext, useState } from "react";
import "./login.scss";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";

export default function Login() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Function to hide the disclaimer when clicked
  const handleDisclaimerClick = () => {
    setShowDisclaimer(false);
  };
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");
  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e)=>{
    e.preventDefault();
    login({email,password}, dispatch)
  }
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <button className="loginButton" onClick={handleLogin}>Sign In</button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
      <div>
      {showDisclaimer && (
        <div className="disclaimer" onClick={handleDisclaimerClick}>
          <p>
            Disclaimer: This website is a project or educational clone
            inspired by Netflix and is not affiliated with the official
            Netflix service. The purpose of this project is purely
            educational and does not involve commercial activities. Any data
            collected on this website is used for educational purposes only
            and is not shared with third parties.
          </p>
        </div>
      )}
    </div>
    </div>
  );
}