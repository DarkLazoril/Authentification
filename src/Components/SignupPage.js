import { useRef, useState } from "react";
import { signup, useAuth } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import { Header } from './Header.js';
import ClosedEye from "../Icons/eye-closed.png"
import styles from '../App.css';

export default function SignupPage() {
  const [ loading, setLoading ] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const currentUser = useAuth();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [getName, setName] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value,usernameRef.current.value, passwordRef.current.value);
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setErrorMessage("Your password is too weak, please choose a stronger password.");
      } else if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already in use. Please use a different email address.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  }
  
    const togglePassword = () => {
    setPasswordShown(!passwordShown);
    }
    if (currentUser) {
      return <Navigate to="/Messagerie" />;
    }
  return (
    
    <div className="Family" onKeyPress={(e) => e.key === 'Enter' && handleSignup()} id="main">
      <Header />
      <div className="Style" >
        <form className="Style1">
          <div><h1 className="header">Sign Up</h1></div>
          <div className="Style2">
              <div className="Style3">
                <label className="lbl">Email</label>
                <span className="spanText">Already have an account? <Link to="/LoginPage" style={{ textDecoration: 'none' }}><span className="spanStyle" > Log in</span></Link></span>
              </div>
              <div className="Style4">
                <input className="input1" disabled={ loading || currentUser } ref={emailRef} type="text" placeholder="xxxxx@xxxx.xxx" />
              </div>
          </div>
            <div className="Style2">
              <div className="Style3">
                <label className="lbl">Name</label>
                </div>
              <div className="Style4">
                <input className="input1" disabled={ loading || currentUser } ref={usernameRef} type="text" placeholder="What shall we call you?" />
              </div>
            </div>
            <div className="Style2">
              <div className="Style3">
                <label className="lbl">Password</label>
              </div>
              <div className="Style7">
                <input className="input1" disabled={ loading || currentUser } ref={passwordRef} type={passwordShown ? "text" : "password"} placeholder="At least 6 digits" />
                <span onClick={() => {togglePassword();setName(!getName)}}>
                {getName ? <img src={ClosedEye} className="eyeicon" alt="eyeicon"/> : <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 640 512" className="eyeicon" ><path fill="currentColor" d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path></svg>}</span>  
              </div>
              {errorMessage && <div className="errorMessage">{errorMessage}</div>}
            </div>
          <div className="Style9">
            <button className="buttonStyle1" disabled={ loading || currentUser } onClick={handleSignup}>Sign up</button>
          </div>
        </form>
      </div>
      <div className="Style11" >Made by Adnan El Mouttaki | Welcome </div>
    </div>
  );
}
