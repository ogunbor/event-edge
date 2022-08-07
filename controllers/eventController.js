const Event = require('../models/Event');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const {
  checkPermissions
 } = require('../utils');

const createEvent = async (req, res) => {
  req.body.user = req.user.userId;
  const event = await Event.create(req.body);
  res.status(StatusCodes.CREATED).json({ event });
};

const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  checkPermissions(req.user, events.user);
  res.status(StatusCodes.OK).json({ events, count: events.length });
};

const getSingleEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findOne({ _id: eventId }).populate('tickets');
  if (!event) {
    throw new CustomError.NotFoundError(`No event with id : ${eventId}`);
  }
  checkPermissions(req.user, event.user);
  res.status(StatusCodes.OK).json({ event });
};

const updateEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findOneAndUpdate({ _id: eventId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    throw new CustomError.NotFoundError(`No event with id : ${eventId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findOne({ _id: eventId });
  if (!event) {
    throw new CustomError.NotFoundError(`No event with id : ${eventId}`);
  }
  await event.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Event removed.' });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const eventImage = req.files.image;
  if (!eventImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  const maxSize = 1024 * 1024;
  if (eventImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${eventImage.name}`
  );
  await eventImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${eventImage.name}` });
};



module.exports = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  uploadImage,
};