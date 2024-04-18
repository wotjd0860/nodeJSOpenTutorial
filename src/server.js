import express from "express";  // handling http
import http from "http";
import Websocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// public 폴더를 유저에게 제공 (유저는 여기에만 접근 가능)
app.use("/public", express.static(__dirname + "/public"));
// 템플릿 지정
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// express
// app.listen(3000, handleListen);

// http server
const server = http.createServer(app);
// new websocket server
const wss = new Websocket.Server({ server });

// fake database
const sockets = [];

// events
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser");
    // event that occurs when the browser close
    socket.on("close", () => {
        console.log("Disconnected from the Browser");
    });
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) => {aSocket.send(`${socket.nickname}: ${message.payload}`)});
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
});

server.listen(3000, handleListen);