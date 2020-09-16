const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 3000;

app.use(express.static("public"));

app.get("/", (request, response) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", socket => {
    console.log("user connect!");
    socket.on("server_to_client", data => {
        socket.broadcast.emit("server_to_client", data);
    });
});

http.listen(PORT, ()=>console.log("please access : http://localhost:" + PORT));