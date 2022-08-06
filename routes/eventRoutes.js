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


module.exports = router;