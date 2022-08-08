const mongoose = require('mongoose');

const SpeakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },

    bio: {
        type: String,
        required: [true, 'Please provide biography'],
        minlength: 10,
        maxlength: 1000,
    },

    image: {
        type: String,
        default: '/uploads/example.jpeg',
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    event: {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: true,
      },
    },

    // Virtual is used to connect parent to child since Event is the parent to Ticket
    { timestamps: true }
);

SpeakerSchema.index({ event: 1 }, { unique: true });

module.exports = mongoose.model('Speaker', SpeakerSchema);