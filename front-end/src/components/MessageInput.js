import React from 'react';

export default function MessageInput({ message, setMessage, sendMessage, selectedUser, setSelectedUser, onFocus }) {
  return (
    <div style={{ padding: '10px 15px 20px', backgroundColor: '#36393f' }}>
      <div style={{ 
        display: 'flex', alignItems: 'center', backgroundColor: '#40444b', 
        borderRadius: '8px', padding: '5px 12px' 
      }}>
        {selectedUser && (
          <div style={{ 
            backgroundColor: '#5865f2', color: 'white', padding: '2px 8px', 
            borderRadius: '4px', marginRight: '8px', fontSize: '12px', display: 'flex', alignItems: 'center'
          }}>
            PV <button onClick={() => setSelectedUser('')} style={{ background: 'none', border: 'none', color: 'white', marginLeft: '5px', cursor: 'pointer' }}>✕</button>
          </div>
        )}

        <input
          type="text"
          onFocus={onFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Conversar..."
          style={{
            flex: 1, background: 'none', border: 'none', color: '#dcddde',
            padding: '10px 0', outline: 'none', fontSize: '16px'
          }}
        />
        
        <button 
          onClick={sendMessage} 
          style={{ background: 'none', border: 'none', color: '#5865f2', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ENVIAR
        </button>
      </div>
    </div>
  );
}