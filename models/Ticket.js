const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide ticket name'],
        minlength: 3,
        maxlength: 50,
    },

    price: {
        type: Number,
        required: [true, 'Please provide ticket price'],
    },

    availableSpace: {
        type: Number,
        require: false
    },

    ticketType: {
        type: String,
        required: [true, 'Please provide ticket type'],
        enum: ['regular', 'premium'],
    },

    ticketStatus: {
        type: String,
        required: [true, 'Please provide ticket status'],
        enum: ['valid', 'invalid'],
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
   { timestamps: true },
);



module.exports = mongoose.model('Ticket', TicketSchema);