import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import LoginForm from './components/LoginForm';
import ChatWindow from './components/ChatWindow';

const newSocket = io('localhost:3333', {
  transports: ['websocket'],
});

export default function Chat() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    if (!isLoggedIn) return;

    newSocket.emit('getMessages');
    newSocket.emit('getUsers');

    newSocket.on('messages', setMessages);
    newSocket.on('users', (userList) =>
      setUsers(userList.filter((u) => u.username !== username))
    );
    newSocket.on('newMessage', (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    return () => newSocket.disconnect();
  }, [isLoggedIn, username]);

  const sendMessage = () => {
    if (!message.trim()) return;

    newSocket.emit('sendMessage', {
      content: message,
      senderName: username,
      receiverName: selectedUser,
    });
    setMessage('');
  };

  if (!isLoggedIn) {
    return (
      <LoginForm
        socket={newSocket}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return (
    <ChatWindow
      username={username}
      message={message}
      messages={messages}
      users={users}
      selectedUser={selectedUser}
      setMessage={setMessage}
      setSelectedUser={setSelectedUser}
      sendMessage={sendMessage}
    />
  );
}
