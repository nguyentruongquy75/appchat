const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:1234"],
  },
});

io.on("connection", (socket) => {
  socket.on("message-client", (message, username) => {
    socket.broadcast.emit("message-server", message, socket.id, username);
  });
});
