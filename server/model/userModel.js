// RADHAKRISHNALOVEPERMANENLTUUUUSHIVAPARVATHIVINYAKA
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 10,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('Users', userSchema);

// mongoose.connect('mongodb://localhost:27017/')
