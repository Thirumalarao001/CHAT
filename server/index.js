// THIRU 
// RADHAKRISHNALOVEUUUUMAPERMANLTUUUU
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
// RADHAKRISHNALOVEUUUUMAPERMANLTUUUU
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});

const io = socket(server, {
    cors: {
        origin: "https://chatroom2005.netlify.app",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log("🙌 User added:", userId);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });

    socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);
    });
});


// RADHAKRISHNALOVEUUUUMAPERMANLTUUUU
// kirety