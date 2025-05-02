import React from 'react';

export default function MessageList({ messages, username, selectedUser }) {
  const filtered = messages.filter((msg) => {
    if (selectedUser) {
      return (
        (msg.receiverName === selectedUser && msg.senderName === username) ||
        (msg.senderName === selectedUser && msg.receiverName === username)
      );
    }
    return !msg.receiverName;
  });

  return (
    <div style={{
      height: '60vh',
      overflowY: 'auto',
      border: '1px solid gray',
      marginBottom: 10,
      padding: 10
    }}>
      {filtered.map((msg, i) => (
        <div key={i}>
          <b>{msg.senderName}:</b> {msg.content}
        </div>
      ))}
    </div>
  );
}
