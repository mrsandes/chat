import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

export default function ChatWindow({
  username,
  message,
  messages,
  users,
  selectedUser,
  setMessage,
  setSelectedUser,
  sendMessage,
}) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: 20 }}>
        <h2>{selectedUser ? `Chat com ${selectedUser}` : 'Chat Geral'}</h2>
        <MessageList
          messages={messages}
          username={username}
          selectedUser={selectedUser}
        />
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <button onClick={() => setSelectedUser('')} style={{ marginTop: 10 }}>
          Voltar ao Chat Geral
        </button>
      </div>
      <UserList
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}
