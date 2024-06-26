import { axiosInstance } from "../../config";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Function to hide the disclaimer when clicked
  const handleDisclaimerClick = () => {
    setShowDisclaimer(false);
  };
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleSign = async (e) => {
    e.preventDefault();
    try{
        navigate("/login");
    }catch(e){
        console.log(e)
    }
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axiosInstance.post("auth/register", { email,username, password });
      navigate("/login");
    } catch (err) {}
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
            <img
                className="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt=""
            />
            <button className="loginR" onClick={handleSign}>
              Sign In
            </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
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