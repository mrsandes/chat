import React, { useEffect, useRef } from 'react';

export default function MessageList({ messages, username, selectedUser }) {
  const bottomRef = useRef(null);

  const filtered = messages.filter((msg) => {
    if (selectedUser) {
      return (
        (msg.receiverName === selectedUser && msg.senderName === username) ||
        (msg.senderName === selectedUser && msg.receiverName === username)
      );
    }
    return !msg.receiverName;
  });

  // Único scroll necessário: quando o número de mensagens muda
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filtered.length]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
      {filtered.map((msg, i) => (
        <div key={i} style={{ padding: '8px 20px', borderLeft: msg.senderName === username ? '4px solid #5865f2' : '4px solid transparent' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <b style={{ color: '#fff', fontSize: '14px' }}>{msg.senderName}</b>
            <span style={{ color: '#72767d', fontSize: '10px' }}>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div style={{ color: '#dcddde', marginTop: '2px', fontSize: '15px' }}>{msg.content}</div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}