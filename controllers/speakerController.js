const Speaker = require('../models/Speaker');
const Event = require('../models/Event');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const {
  checkPermissions
 } = require('../utils');

const createSpeaker = async (req, res) => {
    const {event: eventId} = req.body;
    const isValidEvent = await Event.findOne({ _id: eventId });
    if (!isValidEvent) {
      throw new CustomError.NotFoundError(`No Event with id : ${eventId}`);
    }
    req.body.user = req.user.userId;
    const speaker = await Speaker.create(req.body);
    res.status(StatusCodes.CREATED).json({ speaker });
};

const getAllSpeakers = async (req, res) => {

    // populate shows more about what is attached to it
  const speakers = await Speaker.find({}).populate({
    path: 'event',
    select: 'title description image',
  });
  res.status(StatusCodes.OK).json({ speakers, count: speakers.length });
};

const getSingleSpeaker = async (req, res) => {
    const { id: speakerId } = req.params;
    const speaker = await Speaker.findOne({ _id: ticketId }).populate({
      path: 'event',
      select: 'title description image',
    });
    if (!speaker) {
      throw new CustomError.NotFoundError(`No speaker with id : ${speakerId}`);
    }
    checkPermissions(req.user, speaker.user);
    res.status(StatusCodes.OK).json({ speaker });
};

const updateSpeaker = async (req, res) => {
    const { id: speakerId } = req.params;
    const { name, bio, image } = req.body;
    const speaker = await Ticket.findOneAndUpdate({ _id: speakerId }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!speaker) {
      throw new CustomError.NotFoundError(`No speaker with id : ${speakerId}`);
  }
  
    speaker.name = name;
    speaker.bio = bio;
    speaker.image = image;
  
    await speaker.save();
    checkPermissions(req.user, speaker.user);
    res.status(StatusCodes.OK).json({ speaker });
  };
  
  // Get all speakers tied to an event
const getSingleEventSpeakers = async (req, res) => {
      const { id: eventId } = req.params;
      const speakers = await Speaker.find({ event: eventId });
      res.status(StatusCodes.OK).json({ speakers, count: speakers.length });
};

const deleteSpeaker = async (req, res) => {
    const { id: speakerId } = req.params;
    const speaker = await Speaker.findOne({ _id: speakerId });
    if (!speaker) {
      throw new CustomError.NotFoundError(`No speaker with id : ${speakerId}`);
    }
    await speaker.remove();
    checkPermissions(req.user, speaker.user);
    res.status(StatusCodes.OK).json({ msg: 'Success! Speaker removed.' });
  };


const uploadImage = async (req, res) => {
    if (!req.files) {
      throw new CustomError.BadRequestError('No File Uploaded');
    }
    const speakerImage = req.files.image;
    if (!eventImage.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please Upload Image');
    }
    const maxSize = 1024 * 1024;
    if (speakerImage.size > maxSize) {
      throw new CustomError.BadRequestError(
        'Please upload image smaller than 1MB'
      );
    }
    const imagePath = path.join(
      __dirname,
      '../public/uploads/' + `${speakerImage.name}`
    );
    await speakerImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: `/uploads/${speakerImage.name}` });
};
  



  module.exports = {
    createSpeaker,
    getAllSpeakers,
    getSingleSpeaker,
    updateSpeaker,
    getSingleEventSpeakers,
    deleteSpeaker,
    uploadImage,
  };