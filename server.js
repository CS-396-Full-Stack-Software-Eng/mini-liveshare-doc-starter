const { Server: ioServer } = require("socket.io");
const io = new ioServer({
  cors: {
    origin: "http://localhost:5173",
  },
});

let currentDoc = "";

io.on("connection", (socket) => {
  socket.emit("docChange", currentDoc);

  socket.on("inputChange", (val) => {
    currentDoc = val;
    socket.broadcast.emit("docChange", val);
  });
});

io.listen(8000);
