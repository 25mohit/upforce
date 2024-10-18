const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel');

// @desc Create new event
// @route POST /api/events
const createEvent = asyncHandler(async (req, res) => {
  const { name, date, status } = req.body;

  // Check for required fields
  if (!name || !date || !status) {
    return res.status(400).json({ m: 'Please fill all fields' }); // Send JSON response
  }

  // Create a new event
  console.log(req.user);
  
  const event = await Event.create({ 
    user: req.user._id, 
    name, 
    date, 
    status 
  });

  res.status(201).json(event); // Send the created event as response
});

// @desc Update event
// @route PUT /api/events/:id
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  // Check if event exists
  if (!event) {
    return res.status(404).json({ m: 'Event not found' }); // Send JSON response
  }

  // Check if the user is authorized to update the event
  if (event.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ m: 'Not authorized' }); // Send JSON response
  }
  const { createdAt, ...updateData } = req.body;
  // Update the event
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });

  res.status(200).json(updatedEvent); // Send the updated event as response
});

// @desc Delete event
// @route DELETE /api/events/:id
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
  
    // Check if event exists
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' }); // Send JSON response
    }
  
    // Check if the user is authorized to delete the event
    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' }); // Send JSON response
    }
  
    // Remove the event using findByIdAndDelete
    await Event.findByIdAndDelete(req.params.id);
  
    res.status(200).json({ success: true, message: 'Event removed' }); // Send confirmation message as response
  });

const getEventsForUser = asyncHandler(async (req, res) => {
    const events = await Event.find({ user: req.user._id }).select('-updatedAt -__v -user'); // Find events where the user matches the logged-in user

    if (events.length === 0) {
        return res.status(404).json({ success: false, message: 'No Event Found' }); // Return error if no events are found
    }

    res.status(200).json(events);
});

module.exports = { createEvent, updateEvent, deleteEvent, getEventsForUser };
