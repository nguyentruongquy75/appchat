const PORT = process.env.PORT || 5000;

const io = require("socket.io")(PORT, {
  cors: {
    origin: ["http://localhost:" + PORT],
  },
});

io.on("connection", (socket) => {
  socket.on("message-client", (message, username) => {
    socket.broadcast.emit("message-server", message, socket.id, username);
  });
});
