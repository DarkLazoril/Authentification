import React, { useRef, useState } from "react";
import { login, useAuth,resetPassword  } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import { Header } from './Header.js';
import styles from '../Authenitication.css';

export default function Forgot() {

    const [ loading, setLoading ] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const [resetClicked, setResetClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    async function handleReset() {
      setResetClicked(true);
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        await resetPassword(emailRef.current.value);
        setSuccessMessage('Password reset email sent,');
      } catch (error) {
        if (error.code === "auth/invalid-email"){
        setErrorMessage('Invalid email format,');}
        else if (error.code === "auth/user-not-found") {
          setErrorMessage("Email is not found,");}
          else {
            setErrorMessage("Error sending password reset email,");
          }
      } finally {
        setResetClicked(false);
      }
    }
    

    return (
        <div className="Family" onKeyPress={(e) => e.key === 'Enter' && handleReset()} id="main">
          <Header />
          <div className="Style">
            <div className="Style1">
              <div><h1 className="header">Recover</h1></div>
            <div>
                <div className="Style2">
                  <div className="Style3">
                    <label className="lbl">Email</label>
                    <span className="spanText">Mistake? <Link to="/LoginPage" style={{ textDecoration: 'none' }}><span className="spanStyle" >Go back</span></Link></span>
                    </div>
                  <div className="Style4">
                    <input className="input1" disabled={ loading || currentUser } ref={emailRef} type="text"  />
                  </div>
                  {errorMessage ? (
                <div className="errorMessage">{errorMessage}
                 <span onClick={() => {setLoading(false); setErrorMessage(false); }} style={{pointerEvents: !loading ? 'none' : 'auto'}}> try again!</span>
                  </div>
              ) : successMessage ? (
                <div  style={{color:'#3CDE5C'}} className="errorMessage">{successMessage}
                <Link to="/LoginPage" style={{ textDecoration: 'none' }}>
                  <span className="spanStyle" > Log in.</span>
                </Link></div>
              ) : (
                <h4 className="description">
                  An email will be sent to this email address to reset your
                  password
                </h4>
              )}
                </div>
            </div>
              <div className="Style9">
                <button className="buttonStyle1" disabled={loading || currentUser || resetClicked} onClick={handleReset}>Reset Password</button>
              </div>
            </div>
          </div>
          <div className="Style11">Made by Adnan El Mouttaki | Welcome 
          </div>
        </div>
      );
}