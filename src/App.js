import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [client, setClient] = useState(null);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        stompClient.subscribe("/topic/messages", (message) => {
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
        });
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, []);

  const sendMessage = () => {
    if (client && msg) {
      client.publish({
        destination: "/app/chat.send",
        body: JSON.stringify({ sender: "You", content: msg }),
      });
      setMsg("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Real-Time Chat</h2>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>
            <strong>{m.sender}:</strong> {m.content}
          </li>
        ))}
      </ul>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatApp;