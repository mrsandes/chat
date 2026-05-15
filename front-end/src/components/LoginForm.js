import React from 'react';

export default function LoginForm({ socket, username, password, setUsername, setPassword, setIsLoggedIn }) {
  const containerStyle = {
    display: 'flex',
    height: '100dvh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5865f2'
  };

  const cardStyle = {
    backgroundColor: '#36393f',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    color: 'white'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#202225',
    color: 'white',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#5865f2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const handleAction = (type) => {
    if (!username || !password) return alert('Preencha tudo!');
    socket.emit(type, { username, password });
    socket.once(`${type}Response`, (res) => {
      if (res) {
        if (type === 'login') setIsLoggedIn(true);
        else alert('Criado! Agora faça login.');
      } else alert('Erro na operação');
    });
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '8px' }}>Boas-vindas de volta!</h2>
        <p style={{ color: '#b9bbbe', marginBottom: '20px' }}>Estamos muito animados em te ver novamente!</p>
        <input type="text" placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        <button onClick={() => handleAction('login')} style={buttonStyle}>Entrar</button>
        <button onClick={() => handleAction('register')} style={{ ...buttonStyle, backgroundColor: 'transparent', border: '1px solid #5865f2' }}>Registrar</button>
      </div>
    </div>
  );
}