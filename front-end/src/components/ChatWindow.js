import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

export default function ChatWindow({
  username, message, messages, users,
  selectedUser, setMessage, setSelectedUser, sendMessage,
}) {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100dvh', backgroundColor: '#36393f', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <header style={{ 
          height: '48px', display: 'flex', alignItems: 'center', padding: '0 16px', 
          backgroundColor: '#36393f', borderBottom: '1px solid #202225', justifyContent: 'space-between'
        }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#fff' }}>
            <span style={{ color: '#8e9297' }}>#</span> {selectedUser || 'chat-geral'}
          </h3>
          <button onClick={() => setShowUsers(!showUsers)} style={{ display: window.innerWidth < 768 ? 'block' : 'none', background: '#4f545c', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>
            {showUsers ? 'Fechar' : 'Usuários'}
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
        users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} 
        visible={showUsers || window.innerWidth >= 768}
      />
    </div>
  );
}