const PORT = process.env.PORT || 3000;

const io = require("socket.io")(PORT);

io.on("connection", (socket) => {
  socket.on("message-client", (message, username) => {
    socket.broadcast.emit("message-server", message, socket.id, username);
  });
});
