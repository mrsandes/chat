import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

export default function ChatWindow({
  username, message, messages, users,
  selectedUser, setMessage, setSelectedUser, sendMessage,
}) {
  const [showUsers, setShowUsers] = useState(false);

  // Estilo para o Overlay (camada que fecha ao clicar fora)
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Escurece levemente o chat ao fundo
    zIndex: 5, // Fica atrás da UserList (z-index 10) mas à frente do chat
    display: (showUsers && window.innerWidth < 768) ? 'block' : 'none'
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100dvh', backgroundColor: '#36393f', overflow: 'hidden', position: 'relative' }}>
      
      {/* CAMADA PARA CLICAR FORA (Mobile) */}
      <div style={overlayStyle} onClick={() => setShowUsers(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0 }}>
        <header style={{ 
          height: '48px', display: 'flex', alignItems: 'center', padding: '0 16px', 
          backgroundColor: '#36393f', borderBottom: '1px solid #202225', justifyContent: 'space-between',
          zIndex: 6 // Garante que o header fique visível
        }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#fff' }}>
            <span style={{ color: '#8e9297' }}>#</span> {selectedUser || 'chat-geral'}
          </h3>
          <button 
            onClick={() => setShowUsers(!showUsers)} 
            style={{ 
              display: window.innerWidth < 768 ? 'block' : 'none', 
              background: '#4f545c', color: 'white', border: 'none', 
              padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' 
            }}
          >
            {showUsers ? 'FECHAR' : 'USUÁRIOS'}
          </button>
        </header>

        <MessageList messages={messages} username={username} selectedUser={selectedUser} />
        
        <MessageInput 
          message={message} setMessage={setMessage} sendMessage={sendMessage} 
          selectedUser={selectedUser} setSelectedUser={setSelectedUser}
          onFocus={() => window.innerWidth < 768 && setShowUsers(false)} 
        />
      </div>

      <UserList 
        users={users} selectedUser={selectedUser} setSelectedUser={(u) => {
          setSelectedUser(u);
          if(window.innerWidth < 768) setShowUsers(false); // Fecha ao selecionar alguém
        }} 
        visible={showUsers || window.innerWidth >= 768}
      />
    </div>
  );
}