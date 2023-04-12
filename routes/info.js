const express = require('express');
const router = express.Router();
const Persons = require('../models/persons');

// @route   GET /info
// @desc    get info about person in db
// @access  Public
router.get('/', (request, response) => {
  Persons.count({}).then((result) => {
    response.send(
      `<p>Phonebook has info for ${result} people</p><p>${new Date().toDateString()}</p>`
    );
  });
});

module.exports = router;
