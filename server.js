const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const rooms = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (rooms[roomID]) {
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }
    const otherUser = rooms[roomID].find((id) => id !== socket.id);
    if (otherUser) {
      socket.emit("other user", otherUser);
      socket.to(otherUser).emit("user joined", socket.id);
    }
  });

  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));

/* 
Codigo Explicado:

const express = require("express"); - Importa o módulo Express, um framework Node.js para criação de aplicativos da web.

const http = require("http"); - Importa o módulo HTTP, que fornece funcionalidades para criar e executar um servidor HTTP Node.js.

const app = express(); - Cria uma instância do aplicativo Express.

const server = http.createServer(app); - Cria uma instância do servidor HTTP Node.js usando o aplicativo Express.

const socket = require("socket.io"); - Importa o módulo Socket.io, que fornece suporte para comunicação bidirecional em tempo real entre o cliente e o servidor.

const io = socket(server); - Cria uma instância do Socket.io vinculado ao servidor HTTP Node.js.

const rooms = {}; - Cria um objeto vazio para armazenar informações sobre as salas de chat.

io.on("connection", (socket) => { ... } - Escuta o evento "connection" do Socket.io, que é acionado sempre que um novo cliente se conecta ao servidor.

socket.on("join room", (roomID) => { ... } - Escuta o evento "join room" emitido pelo cliente, que é acionado quando um usuário tenta entrar em uma sala de chat. Se a sala já existe, adiciona o ID do socket do usuário à matriz de usuários da sala, caso contrário, cria uma nova sala e adiciona o usuário à matriz. Em seguida, busca na matriz de usuários da sala pelo ID do outro usuário e envia uma mensagem "other user" para o usuário atual e "user joined" para o outro usuário.

socket.on("offer", (payload) => { ... } - Escuta o evento "offer" emitido pelo cliente, que é acionado quando um usuário envia uma oferta de conexão WebRTC para outro usuário. Em seguida, transmite a oferta para o destinatário usando o método io.to() do Socket.io.

socket.on("answer", (payload) => { ... } - Escuta o evento "answer" emitido pelo cliente, que é acionado quando um usuário envia uma resposta de conexão WebRTC para outro usuário. Em seguida, transmite a resposta para o destinatário usando o método io.to() do Socket.io.

socket.on('ice-candidate',incoming => { ... } - Escuta o evento "ice-candidate" emitido pelo cliente, que é acionado quando um usuário envia um candidato ICE para outro usuário. Em seguida, transmite o candidato para o destinatário usando o método io.to() do Socket.io.

server.listen(11000, () => console.log("O server esta rodando na porta 11000")); - Inicia o servidor HTTP Node.js na porta 11000 e exibe uma mensagem no console quando o servidor estiver em execução.
*/
