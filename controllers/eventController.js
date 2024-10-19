const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel');

// @desc Create new event
// @route POST /api/events
const createEvent = asyncHandler(async (req, res) => {
  const { name, date, status, description } = req.body;

  // Check for required fields
  if (!name || !date || !status) {
    return res.status(400).json({ m: 'Please fill all fields' }); // Send JSON response
  }

  console.log(req.user._id);
  
  const event = await Event.create({ 
    user: req.user._id, 
    name, 
    description,
    date, 
    status 
  });

  res.status(201).json(event); // Send the created event as response
});

// @desc Update event
// @route PUT /api/events/:id
const updateEvent = asyncHandler(async (req, res) => {
  
  const { name, date, status, description } = req.body;

  if (!name || !date || !status) {
    return res.status(400).json({ m: 'Please fill all fields' }); // Send JSON response
  }

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

const getFilteredEvents = asyncHandler(async (req, res) => {
  const { search, sort, page = 1, status } = req.query;

  let query = { user: req.user._id };

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (status) {
    query.status = status;
  }

  let sortOption = {};
  if (sort === 'name') {
    sortOption.name = 1; // ascending order
  } else if (sort === 'createdAt') {
    sortOption.createdAt = -1; // descending order
  } else if (sort === 'status') {
    sortOption.status = 1; // ascending order
  }

  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const totalDocuments = await Event.countDocuments({ user: req.user._id });

  const filteredEvents = await Event.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(pageSize)
    .select('-updatedAt -__v'); // Exclude 'updatedAt' and '__v'

  const eventStats = await Event.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  let stats = {
    active: 0,
    pending: 0,
    cancelled: 0
    };

  eventStats.forEach((stat) => {
    if (stat._id === 'active') stats.active = stat.count;
    if (stat._id === 'pending') stats.pending = stat.count;
    if (stat._id === 'cancelled') stats.cancelled = stat.count;
  });

  res.status(200).json({
    stats,
    filteredData: {
      page,
      pageSize,
      totalDocuments,
      events: filteredEvents
    }
  });
})

module.exports = { createEvent, updateEvent, deleteEvent, getEventsForUser, getFilteredEvents };
