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

// From ticket controller
const {getSingleEventTickets} = require('../controllers/ticketController')

// From speaker controller
const {getSingleEventSpeakers} = require('../controllers/speakerController')


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

  // Gets all speakers associated with a particular event
router.route('/:id/speakers').get(getSingleEventSpeakers)


module.exports = router;