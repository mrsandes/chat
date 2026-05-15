import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

export default function ChatWindow({
  username, message, messages, users,
  selectedUser, setMessage, setSelectedUser, sendMessage,
}) {
  const [showUsers, setShowUsers] = useState(false);

  // Item 5: Fecha a aba de usuários ao focar no input
  const handleInputFocus = () => {
    if (window.innerWidth < 768) setShowUsers(false);
  };

  return (
    <div style={{ display: 'flex', height: '100dvh', backgroundColor: '#36393f', color: '#dcddde', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ 
          height: '50px', display: 'flex', alignItems: 'center', padding: '0 20px', 
          backgroundColor: '#36393f', borderBottom: '1px solid #202225', justifyContent: 'space-between' 
        }}>
          {/* Item 2: Título corrigido */}
          <h3 
            onClick={() => setSelectedUser('')} 
            style={{ cursor: 'pointer', margin: 0, fontSize: '16px' }}
          >
            <span style={{ color: '#8e9297' }}>#</span> {selectedUser ? selectedUser : 'chat-geral'}
          </h3>
          
          <button 
            onClick={() => setShowUsers(!showUsers)}
            style={{ 
              display: window.innerWidth < 768 ? 'block' : 'none', 
              background: '#4f545c', border: 'none', color: 'white', 
              padding: '5px 10px', borderRadius: '4px', fontSize: '12px' 
            }}
          >
            {showUsers ? 'FECHAR' : 'USUÁRIOS'}
          </button>
        </header>

        <MessageList messages={messages} username={username} selectedUser={selectedUser} />
        
        {/* Item 5: Passamos o handleInputFocus para o input */}
        <MessageInput 
          message={message} 
          setMessage={setMessage} 
          sendMessage={sendMessage} 
          selectedUser={selectedUser} 
          setSelectedUser={setSelectedUser}
          onFocus={handleInputFocus} 
        />
      </div>

      {/* Item 4: Ajuste de Z-index e largura para não tampar tudo */}
      <UserList 
        users={users} 
        selectedUser={selectedUser} 
        setSelectedUser={(u) => { setSelectedUser(u); if(window.innerWidth < 768) setShowUsers(false); }} 
        visible={showUsers || window.innerWidth >= 768}
      />
      
      {/* Overlay para fechar usuários clicando fora (Mobile) */}
      {showUsers && window.innerWidth < 768 && (
        <div 
          onClick={() => setShowUsers(false)} 
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 5 }}
        />
      )}
    </div>
  );
}