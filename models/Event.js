const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please provide event title'],
        minlength: [4, 'Title cannot be less than 4 characters or more than 100 characters'],
        maxlength: [100, 'Title cannot be less than 4 characters or more than 100 characters'],
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Please provide event description'],
        minlength: [5, 'Title cannot be less than 5 characters or more than 1000 characters'],
        maxlength: [1000, 'Title cannot be less than 5 characters or more than 1000 characters'],
    },

    image: {
        type: String,
        default: '/uploads/example.jpeg'
    },

    category: {
        type: String,
        required: [true, 'Please provide event category'],
        enum: ['day', 'night'],
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },

    // Virtual is used to connect parent to child since Event is the parent to Ticket
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

EventSchema.virtual('tickets', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'event',
    justOne: false,
});
////////////////////

// This is used to delete all the tickets associated with an event if the event is deleted
EventSchema.pre('remove', async function (next) {
    await this.model('Ticket').deleteMany({ event: this._id });
  });

module.exports = mongoose.model('Event', EventSchema);