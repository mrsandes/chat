import React, { useEffect } from 'react';

export default function MessageInput({ message, setMessage, sendMessage, selectedUser, setSelectedUser, onFocus }) {
  
  // Efeito para quando você digita novos símbolos (já está funcionando)
  useEffect(() => {
    if (window.innerWidth < 768 && message.length > 0) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }
  }, [message]);

  const handleLocalFocus = (e) => {
    if (onFocus) onFocus(); 

    // O SEGREDO: Executa múltiplos scrolls em tempos diferentes
    // Isso garante que independente da velocidade da animação do teclado, a tela suba
    const scrollToEnd = () => {
      // 1. Tenta centralizar o input
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // 2. Força o scroll do documento para o fim absoluto
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    };

    // Executa imediatamente ao clicar
    scrollToEnd();

    // Executa após 300ms (quando o teclado terminou de subir)
    setTimeout(scrollToEnd, 300);

    // Executa após 600ms (margem de segurança para dispositivos mais lentos)
    setTimeout(scrollToEnd, 600);
  };

  return (
    <div style={{ padding: '10px 20px 20px 20px', backgroundColor: '#36393f' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: '#40444b', 
        borderRadius: '8px', 
        padding: '2px 15px' 
      }}>
        
        {selectedUser && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#5865f2', 
            color: 'white', 
            padding: '2px 8px', 
            borderRadius: '4px', 
            marginRight: '10px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            PV
            <button 
              onClick={() => setSelectedUser('')} 
              style={{ background: 'none', border: 'none', color: 'white', marginLeft: '5px', cursor: 'pointer' }}
            >✕</button>
          </div>
        )}

        <input
          type="text"
          onFocus={handleLocalFocus} 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Conversar..."
          style={{
            flex: 1, 
            background: 'none', 
            border: 'none', 
            color: '#dcddde',
            padding: '12px 0', 
            outline: 'none', 
            fontSize: '16px' 
          }}
        />
        
        <button 
          onClick={sendMessage} 
          style={{ background: 'none', border: 'none', color: '#5865f2', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ENVIAR
        </button>
      </div>
    </div>
  );
}