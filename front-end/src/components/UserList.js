export default function UserList({ users, selectedUser, setSelectedUser, visible }) {
  if (!visible) return null;

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{
      width: isMobile ? '70%' : '240px', // Não ocupa 100% no mobile
      backgroundColor: '#2f3136',
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid #26272b',
      position: isMobile ? 'fixed' : 'relative',
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 10,
      boxShadow: isMobile ? '-5px 0 15px rgba(0,0,0,0.5)' : 'none'
    }}>
      <h4 style={{ color: '#8e9297', fontSize: '12px', textTransform: 'uppercase', padding: '20px 15px 10px' }}>
        Usuários Online — {users.length}
      </h4>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {users.map((user, i) => (
          <button
            key={i}
            onClick={() => setSelectedUser(user.username)}
            style={{
              display: 'flex', alignItems: 'center', width: '90%', margin: '2px auto',
              padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer',
              backgroundColor: selectedUser === user.username ? '#4f545c' : 'transparent',
              color: selectedUser === user.username ? '#fff' : '#8e9297'
            }}
          >
            <div style={{ width: '8px', height: '8px', backgroundColor: '#3ba55d', borderRadius: '50%', marginRight: '10px' }} />
            {user.username}
          </button>
        ))}
      </div>
    </div>
  );
}