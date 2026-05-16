# 💬 Chat App

---

## 📌 Sobre

O **Chat App** é uma aplicação de mensagens em tempo real que permite comunicação instantânea entre múltiplos usuários conectados.

O projeto utiliza arquitetura cliente-servidor com WebSockets para atualização em tempo real e está organizado em um monorepositório contendo:

```txt
chat/
├── back-end/   # NestJS + WebSocket
└── front-end/  # React
```

---

# ⚙️ Tecnologias

## Back-end

- NestJS
- TypeScript
- WebSocket

## Front-end

- React
- Vite
- TypeScript

---

# 🚀 Instalação

Clone o repositório:

```bash
git clone https://github.com/mrsandes/chat.git
```

Entre na pasta do projeto:

```bash
cd chat
```

Instale todas as dependências:

```bash
npm run install:all
```

---

# ▶️ Executando Localmente

Inicie o front-end e back-end simultaneamente:

```bash
npm run dev
```

A aplicação estará disponível em:

```txt
http://localhost:3000
```

---

# 🏗️ Build de Produção

Gerar build completo:

```bash
npm run build:all
```

Iniciar aplicação em produção:

```bash
npm run start:prod
```

---

# 🌐 Demo Online

👉 https://chat-75qc.onrender.com

---

# ✨ Funcionalidades

- Comunicação em tempo real
- Múltiplos usuários conectados
- Atualização instantânea via WebSocket
- Arquitetura Full Stack
- Monorepositório
