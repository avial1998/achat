import { computeHeadingLevel } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { db } from "../../Services/firebase";
const Card = ({ name, uid, setChat }) => {
  return (
    <div className="member-card">
      <p>{name}</p>
      <button
        className="card-button"
        onClick={() => {
          setChat(uid, name);
        }}
      >
        Chat
      </button>
    </div>
  );
};
const Members = ({ uid, setChat }) => {
  const [users, setUsers] = useState([]);
  function getUsers() {
    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setUsers(() => {
            return [change.doc.data()];
          });
        }
      });
    });
  }

  useEffect(() => {
    getUsers();
  }, []);
  console.log(users);

  return (
    <div className="member-container">
      <div className="member-header">
        <h2 className="h2">Members</h2>
      </div>
      <div className="member-body">
        {users &&
          users.map((user) => {
            if (user.uid !== uid) {
              return (
                <Card
                  key={user.uid}
                  uid={user.uid}
                  name={user.name}
                  setChat={setChat}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default Members;
