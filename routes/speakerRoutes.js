const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
    createSpeaker,
    getAllSpeakers,
    getSingleSpeaker,
    updateSpeaker,
    deleteSpeaker,
    uploadImage,
} = require('../controllers/SpeakerController');

router
  .route('/')
  .post([authenticateUser], createSpeaker)
  .get([authenticateUser, authorizePermissions('admin')], getAllSpeakers);

router
  .route('/uploadImage')
  .post([authenticateUser], uploadImage);

router
  .route('/:id')
  .get([authenticateUser],getSingleSpeaker)
  .patch([authenticateUser], updateSpeaker)
  .delete([authenticateUser], deleteSpeaker);  



module.exports = router;