import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3333');
function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('msgToCliente', (msg, senderId) => {
      setMessages(prevMessages => [...prevMessages, { senderId, message: msg }]);
    });

    return () => {
      socket.off('msgToCliente');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('msgToServer', message);
      setMessages(prevMessages => [...prevMessages, { senderId: 'You', message }]);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h2>Chat WebSocket</h2>
      <div id="messages">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.senderId}:</strong> {msg.message}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Digite sua mensagem" 
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default App;
