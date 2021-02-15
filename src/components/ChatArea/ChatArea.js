import React, { useState, useEffect } from "react";
import { db } from "../../Services/firebase";
import firebase from "firebase";

const ChatArea = ({ messages, myId, otherId, name }) => {
  const [myMessage, setMyMessage] = useState({
    sender_id: "",
    receiver_id: "",
    message: "",
  });

  const sendMessage = async () => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp;
    db.collection("chats").add({ ...myMessage, createdAt: timestamp() });
  };
  useEffect(() => {
    document.getElementById("scroll").scrollIntoView();
  }, [messages]);
  return (
    <div className="ChatArea-container">
      <div className="messageArea">
        <button
          className="close-chat"
          onClick={() => {
            var unsubscribe = db.collection("chat").onSnapshot(() => {});
            unsubscribe();
            messages = [];
          }}
        >
          {name}
        </button>

        {messages &&
          messages.map((message) => {
            if (message.sender_id === myId) {
              return (
                <div className="self">
                  <span>{message.message}</span>
                </div>
              );
            } else {
              return (
                <div className="other">
                  <span>{message.message}</span>
                </div>
              );
            }
          })}

        <div id="scroll"></div>
      </div>
      <div className="send-container">
        <input
          type="text"
          name="message"
          value={myMessage.message}
          onChange={(e) => {
            setMyMessage({
              sender_id: myId,
              receiver_id: otherId,
              message: e.target.value,
            });
          }}
          placeholder="Enter your message..."
        />
        <button type="button" className="sendButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
