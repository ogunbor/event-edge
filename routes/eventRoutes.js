const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
    createEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    uploadImage,
} = require('../controllers/EventController');

const {getSingleEventTickets} = require('../controllers/ticketController')

router
  .route('/')
  .post([authenticateUser], createEvent)
  .get([authenticateUser, authorizePermissions('admin')], getAllEvents);

router
  .route('/uploadImage')
  .post([authenticateUser], uploadImage);

router
  .route('/:id')
  .get([authenticateUser],getSingleEvent)
  .patch([authenticateUser, authorizePermissions('admin')], updateEvent)
  .delete([authenticateUser, authorizePermissions('admin')], deleteEvent);

   // Gets all the tickets associated with a particular event
  router.route('/:id/tickets').get(getSingleEventTickets)


module.exports = router;