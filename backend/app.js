import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const connectedUsers = new Set();

io.on('connection', (socket) => {
    console.log('Nouvelle connexion Socket.IO');
  
    socket.on('login', (userName) => {
      connectedUsers.add(userName);
      socket.join(userName); // Rejoint le salon correspondant à l'utilisateur
      io.emit('userList', Array.from(connectedUsers));
    });
  
    socket.on('message', ({ text, isSent, sender, recipient }) => {
      io.to(recipient).to(sender).emit('message', { text, isSent, sender, recipient });
      io.emit('userList', Array.from(connectedUsers));
    });
  
    socket.on('disconnect', () => {
      const user = Array.from(connectedUsers).find((u) => io.sockets.sockets.get(u) === socket);
      if (user) {
        connectedUsers.delete(user);
        io.emit('userList', Array.from(connectedUsers));
      }
      console.log('Déconnexion Socket.IO');
    });
  });
server.listen(PORT, () => {
  console.log(`Serveur Express écoutant sur le port ${PORT}`);
});
