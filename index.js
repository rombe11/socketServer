const express = require("express");
const Socket = require("socket.io");
const PORT = 3000;

const app = express();
const server = require("http").createServer(app);

const io = Socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", socket => {
    socket.on("join", user => {
        console.log(`user connected.`);
        io.emit("join", user);
    });

    socket.on("message", message => {
        io.emit("message", message)
        console.log(message);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

server.listen(PORT, () => {
    console.log("Listening on PORT: ", PORT);
});
