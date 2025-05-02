import React from 'react';

export default function LoginForm({
  socket,
  username,
  password,
  setUsername,
  setPassword,
  setIsLoggedIn,
}) {
  const handleLogin = () => {
    if (!username || !password) {
      alert('Por favor, insira seu nome de usuário e senha.');
      return;
    }

    socket.emit('login', { username, password });
    socket.once('loginResponse', (response) => {
      if (response) {
        localStorage.setItem('username', username);
        setIsLoggedIn(true);
      } else {
        alert('Falha no login');
      }
    });
  };

  const handleRegister = () => {
    if (!username || !password) {
      alert('Por favor, insira seu nome de usuário e senha.');
      return;
    }

    socket.emit('register', { username, password });
    socket.once('registerResponse', (response) => {
      if (response) {
        alert('Usuário criado com sucesso!');
        handleLogin();
      } else {
        alert('Falha ao criar o usuário');
      }
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleLogin}>Login</button>
      <p>Não tem uma conta? <button onClick={handleRegister}>Registrar</button></p>
    </div>
  );
}
