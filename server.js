const PORT = process.env.PORT || 3000;

const io = require("socket.io")(PORT, {
  cors: {
    origin: ["http://localhost:1234"],
  },
});

io.on("connection", (socket) => {
  socket.on("message-client", (message, username) => {
    socket.broadcast.emit("message-server", message, socket.id, username);
  });
});
