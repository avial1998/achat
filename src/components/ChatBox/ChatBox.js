import React, { useState } from "react";
import { ChatArea, Members } from "../../components";
import { db } from "../../Services/firebase";
const ChatBox = ({ uid }) => {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const setChat = (id, name) => {
    setMessages([]);
    setId(id);
    setName(name);
    db.collection("chats")
      // .where("sender_id", "in", [uid, id])
      .orderBy("createdAt")
      .limit(10)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            if (
              change.doc.data().sender_id == uid ||
              change.doc.data().sender_id == id
            ) {
              if (
                change.doc.data().receiver_id == uid ||
                change.doc.data().receiver_id == id
              ) {
                setMessages((prev) => {
                  return [...prev, change.doc.data()];
                });
              }
            }
          }
        });
      });

    console.log("chat set...!");
  };
  console.log(messages);
  return (
    <div className="chatbox-container">
      <Members uid={uid} setChat={setChat} />
      <ChatArea messages={messages} myId={uid} otherId={id} name={name} />
    </div>
  );
};

export default ChatBox;
