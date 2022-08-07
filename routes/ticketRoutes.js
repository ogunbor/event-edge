const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createTicket,
  getAllTickets,
  getSingleTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/TicketController');


router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createTicket)
  .get([authenticateUser, authorizePermissions('admin')], getAllTickets);


router
  .route('/:id')
  .get([authenticateUser],getSingleTicket)
  .patch([authenticateUser, authorizePermissions('admin')], updateTicket)
  .delete([authenticateUser, authorizePermissions('admin')], deleteTicket);


module.exports = router;