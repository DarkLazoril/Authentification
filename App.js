import { useRef, useState } from "react";
import { signup, login, logout, useAuth } from "./firebase";
import styles from './App.css';
export default function App() {
  const [ loading, setLoading ] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Email ou mot de passe incorrect!");
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <div  id="main">
      
      <div className="App-header ">
      Système de messagerie 0.1
      </div>
      <div className="container">
      <div  id="fields">
        <label className="label">Type your email:</label>
        <input className="inputstyle" ref={emailRef} placeholder="xxxxx@xxxx.xxx" />
        </div>
        <div id="fields">
        <label className="label">Type your password</label>
        <input className="inputstyle" ref={passwordRef} type="password" placeholder="**************" />
        </div>
        <div className="vertical-center">
      <button className="button1" disabled={ loading || currentUser } onClick={handleLogin}>Log In</button>
      <button className="button2" disabled={ loading || !currentUser } onClick={handleLogout}>Log Out</button>
      </div>
      </div>
      <div>Welcome { currentUser?.email } </div>
    </div>
  );
}
