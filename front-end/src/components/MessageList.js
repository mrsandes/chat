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

  useEffect(() => {
    const scrollToBottom = () => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    scrollToBottom();
    
    // Executa uma segunda vez após um curto delay para garantir 
    // que o redimensionamento do teclado terminou
    const timeoutId = setTimeout(scrollToBottom, 100);
    
    return () => clearTimeout(timeoutId);
  }, [filtered.length]); //

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      {filtered.map((msg, i) => (
        <div key={i} style={{ padding: '0 20px', borderLeft: msg.senderName === username ? '4px solid #5865f2' : '4px solid transparent' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <b style={{ color: '#fff', fontSize: '14px' }}>{msg.senderName}</b>
            <span style={{ color: '#72767d', fontSize: '11px' }}>Hoje às {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div style={{ color: '#dcddde', marginTop: '4px', fontSize: '15px', lineHeight: '1.4' }}>
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}