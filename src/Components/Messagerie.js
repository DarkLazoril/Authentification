import { useRef, useState } from "react";
import { logout,useAuth } from "../firebase";
import { Link } from "react-router-dom";
import { Header } from './Header.js';
import styles from '../Authenitication.css';

export default function LoginPage() {
  const [ loading, setLoading ] = useState(false);
  const currentUser = useAuth();

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
    <div className="Family" id="main">
      <h1 className="texto2">Connected</h1>
      <div className="Style11">Made by Adnan El Mouttaki | Welcome 
      <span className="name"> { currentUser?.displayName } </span>
      <Link to="/LoginPage" style={{ textDecoration: 'none', color:'antiquewhite' }} ><span style={{ color:'#991A20'}} className="spanStyle"  onClick={handleLogout} disabled={ loading || !currentUser }> Log out</span></Link>
      </div>
    </div>
  );
}