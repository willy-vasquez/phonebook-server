const express = require('express');
const router = express.Router();

const Persons = require('../models/persons');

// @route   GET /api/persons
// @desc    list all persons in db
// @access  Public

router.get('/', async (request, response, next) => {
  try {
    const persons = await Persons.find({});
    response.json(persons);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/persons/:id
// @desc    list a person filtered by id
// @access  Public

router.get('/:id', async (request, response, next) => {
  const { id } = request.params;

  try {
    const person = await Persons.findById(id);
    if (person) response.json(person);
    else response.status(404).end();
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/persons/:id
// @desc    delete a person filtered by id
// @access  Public

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  if (!id) return response.status(404);

  try {
    const person = await Persons.deleteOne({ _id: id });
    if (+person.deletedCount === 1) response.status(204).end();
    else response.status(404).json({ message: 'element not found' }).end();
  } catch (error) {
    response.status(500).json({ error: error.message }).end();
  }
});

// @route   POST /api/persons
// @desc    insert a new person into db
// @access  Public

router.post('/', async (request, response, next) => {
  const { body } = request;

  if (!body.name || !body.number)
    return response.status(400).json({
      error: 'data missing',
    });

  const newPerson = new Persons({
    name: body.name,
    number: body.number,
  });
  try {
    const newOne = await newPerson.save();
    response.status(201).json(newOne);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/persons/:id
// @desc    update a person filtered by id
// @access  Public

router.put('/:id', async (request, response) => {
  let { id } = request.params;

  const { name, number } = request.body;

  const newPerson = {
    name,
    number,
  };

  try {
    const result = await Persons.updateOne({ _id: id }, newPerson);
    if (+result.modifiedCount === 1) response.status(204).end();
    else response.status(404).json({ message: 'element not found' }).end();
  } catch (error) {
    response.status(500).json({ error: error.message }).end();
  }
});

module.exports = router;
