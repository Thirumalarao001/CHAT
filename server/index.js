// KIRETY
// RADHAKRISHNALOVEUUUUMAPERMANLTUUUU
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
// RADHAKRISHNALOVEUUUUMAPERMANLTUUUU
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
require("dotenv").config();

const userRoutes = require("../server/routes/userRoutes.js");
const messageRoutes = require("../server/routes/messagesRoutes.js");

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => console.log("✅ DB Connected"))
    .catch((err) => console.log(err));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 RADHAKRISHNALOVE: Server running on port 5000");
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:5173", // ✅ frontend origin
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("🟢 New socket connected:", socket.id);

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log("🙌 User added:", userId);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message); // ✅ fixed spelling
        }
    });

    socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);
    });
});

// RADHAKRISHNALOVEUUUUMAPERMANLTUUUU
// kirety