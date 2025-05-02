import React from 'react';

export default function UserList({ users, selectedUser, setSelectedUser }) {
  return (
    <div style={{ width: 200, borderLeft: '1px solid gray', padding: 10 }}>
      <h3>Usuários</h3>
      {users.map((user, i) => (
        <button
          key={i}
          onClick={() => setSelectedUser(user.username)}
          style={{
            display: 'block',
            width: '100%',
            marginBottom: 5,
            backgroundColor: selectedUser === user.username ? '#ccc' : 'white',
          }}
        >
          {user.username}
        </button>
      ))}
    </div>
  );
}
