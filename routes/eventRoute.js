const express = require('express');
const { createEvent, updateEvent, deleteEvent, getEventsForUser, getFilteredEvents } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createEvent);

router.route('/:id')
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);
router.route('/user').get(protect, getEventsForUser);
router.get('/filter', protect, getFilteredEvents);


module.exports = router;
