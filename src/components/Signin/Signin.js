import React from "react";

import firebase from "firebase";
import { db } from "../../Services/firebase";
const Signin = ({ setUser }) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const onsubmit = async (e) => {
    e.preventDefault();
    const response = await firebase.auth().signInWithPopup(provider);
    console.log(response.user);
    setUser(response.user);
  };
  return (
    <div className="signin-card">
      <div className="signin-header">
        <h2>Welcome to Achat </h2>
      </div>
      <div className="signin-body">
        <h4>
          <em>Please sign in with Google</em>
        </h4>

        <button className="signin-button" onClick={(e) => onsubmit(e)}>
          <img
            src="https://img.icons8.com/fluent/48/000000/google-logo.png"
            style={{ width: "20px", alignSelf: "center", marginRight: "4px" }}
          />
          <span>Google Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default Signin;
