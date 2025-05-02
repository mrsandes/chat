import React from 'react';

export default function MessageInput({ message, setMessage, sendMessage }) {
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Digite uma mensagem..."
        style={{ width: '80%', marginRight: 10 }}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
