import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { ChatBox, Home } from "./components";
import firebase from "firebase";
import { db } from "./Services/firebase";
const Header = ({ setUser, setAuth, user }) => {
  const logout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    console.log("Signedout...!");

    setUser(null);
    setAuth(false);

    return <Home />;
  };
  return (
    <>
      <div className="header">
        <h2>Achat</h2>
        <h4>{user && user.displayName}</h4>
        <button className="logout" onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>
    </>
  );
};
function App() {
  const [authenticated, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState("");
  const newUser = firebase.auth().currentUser;
  useEffect(() => {
    setUser(newUser);
    console.log(user);

    if (user) {
      setAuth(true);
      db.collection("users")
        .doc(user.uid)
        .set({
          name: user.displayName,
          uid: user.uid,
        })
        .then(() => console.log("user added successfully....!"));
      setUid(user.uid);
    }
  }, [user]);
  // useEffect(() => {}, [authenticated]);

  return (
    <div className="Outer-container">
      <Header setUser={setUser} setAuth={setAuth} user={user} />

      <Router>
        {authenticated ? <ChatBox uid={uid} /> : <Home setUser={setUser} />}
      </Router>
    </div>
  );
}

export default App;
