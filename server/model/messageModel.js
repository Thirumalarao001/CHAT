// RADHAKRISHNALOVEPERMANENLTUUUUSHIVAPARVATHIVINYAKA
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema(
    {
        message: {
            text: { type: String, required: true },
        },
        users: Array,
        sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('Messages', messageSchema);

// mongoose.connect('mongodb://localhost:27017/')
