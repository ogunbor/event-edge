const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const {
   checkPermissions
  } = require('../utils');

const createTicket = async (req, res) => {
  const {event: eventId} = req.body;
  const isValidEvent = await Event.findOne({ _id: eventId });
  if (!isValidEvent) {
    throw new CustomError.NotFoundError(`No Event with id : ${eventId}`);
  }
  req.body.user = req.user.userId;
  const ticket = await Ticket.create(req.body);
  res.status(StatusCodes.CREATED).json({ ticket });
};

const getAllTickets = async (req, res) => {

    // populate shows more about what is attached to it
  const tickets = await Ticket.find({}).populate({
    path: 'event',
    select: 'title description image',
  });
  res.status(StatusCodes.OK).json({ tickets, count: tickets.length });
};

const getSingleTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const ticket = await Ticket.findOne({ _id: ticketId }).populate({
    path: 'event',
    select: 'title description image',
  });
  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket with id : ${ticketId}`);
  }
  checkPermissions(req.user, ticket.user);
  res.status(StatusCodes.OK).json({ ticket });
};

const updateTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const { price, availableSpace, ticketType } = req.body;
  const ticket = await Ticket.findOneAndUpdate({ _id: ticketId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket with id : ${ticketId}`);
  }

  ticket.price = price;
  ticket.availableSpace = availableSpace;
  ticket.ticketType = ticketType;

  await ticket.save();
  res.status(StatusCodes.OK).json({ ticket });
};

// Get all tickets tied to an event
const getSingleEventTickets = async (req, res) => {
    const { id: eventId } = req.params;
    const tickets = await Ticket.find({ event: eventId });
    res.status(StatusCodes.OK).json({ tickets, count: tickets.length });
  };
  

// const updateSingleUserTicket = async (req, res) => {
//     const { id: ticketId } = req.params;
//     const {  ticketType } = req.body;
//     const ticket = await Ticket.findOneAndUpdate({ _id: ticketId }, req.body, {
//       new: true,
//       runValidators: true,
//     });
  
//     if (!ticket) {
//       throw new CustomError.NotFoundError(`No ticket with id : ${ticketId}`);
//     }
//     checkPermissions(req.user, ticket.user);
//     ticket.ticketType = ticketType;
  
//     await ticket.save();
//     checkPermissions(req.user, ticket.user);
//     res.status(StatusCodes.OK).json({ ticket });
//   };

const deleteTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const ticket = await Ticket.findOne({ _id: ticketId });
  if (!ticket) {
    throw new CustomError.NotFoundError(`No ticket with id : ${ticketId}`);
  }
  await ticket.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Ticket removed.' });
};


module.exports = {
  createTicket,
  getAllTickets,
  getSingleTicket,
  updateTicket,
  deleteTicket,
  getSingleEventTickets
};