const express = require('express');
const { createEvent, updateEvent, deleteEvent, getEventsForUser } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createEvent);

router.route('/:id')
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);
router.route('/user').get(protect, getEventsForUser);

module.exports = router;
