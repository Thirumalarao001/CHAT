// RADHAKRISHNALOVEUUUUMAPERMANLTUUUU
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
// RADHAKRISHNALOVEUUUUMAPERMANLTUUUU
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050
const express = require('express')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const userRoutes = require("../server/routes/userRoutes.js");


require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes)
app.use("/api/messages", require("../server/routes/messagesRoutes.js"))
mongoose.connect(process.env.MONOGODB_URL, {

})
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));


const server = app.listen(process.env.PORT, () => {
    console.log("RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5000");
});

const io = socket(server, {
    cors: {
        // origin: "https://ksvid-chat.netlify.app"
        origin:"https://mnrkpslvidata.netlify.app", // same port as frontend
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message)
        }
    })
})

// RADHAKRISHNALOVEUUUUMAPERMANLTUUUU
// kirety