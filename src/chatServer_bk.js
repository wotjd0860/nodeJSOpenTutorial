import express from "express";  // handling http
import http from "http";
// import Websocket from "ws";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

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
const httpServer = http.createServer(app);

/* WebSocket Server Codes */
/*
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
*/

/* SocketIO Server Codes */
const wsServer = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});
instrument(wsServer, {
    auth: false,
    mode: "development",
});

function publicRooms() {
    const {
        sockets: {
            adapter: {sids, rooms}
        }
    } = wsServer;
    const publicRooms = [];
    rooms.forEach( (_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    } );
    return publicRooms;
}

function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName).size;
}

wsServer.on("connection", (socket) => {
    socket["nickname"] = "Anon";
    socket.onAny((event) => {
        console.log(wsServer.sockets.adapter);
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
        wsServer.sockets.emit("room_change", publicRooms());
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => {
            socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1);
        });;
    });
    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
    });
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });
    socket.on("nickname", (nickname) => {
        socket["nickname"] = nickname;
    });
});


httpServer.listen(3000, handleListen);