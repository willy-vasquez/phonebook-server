const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

morgan('tiny');
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :response-time ms :body'));

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><p>${new Date().toDateString()}</p>`
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const { id } = request.params;

  if (!id) return response.status(404);
  response.json(persons.find((p) => p.id === +id));
});

app.delete('/api/persons/:id', (request, response) => {
  const { id } = request.params;
  console.log(id);
  if (!id) return response.status(404);
  persons = persons.filter((p) => p.id !== +id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const { body } = request;

  if (!body.name || !body.number)
    return response.status(400).json({
      error: 'data missing',
    });

  const exists = persons.find((p) => p.name === body.name);
  if (exists)
    return response.status(409).json({
      error: 'name must be unique',
    });

  const random = Math.floor(Math.random() * 9999);
  const newPerson = {
    id: random,
    name: body.name,
    number: body.number || '',
  };

  persons.push(newPerson);
  response.status(201).json(newPerson);
});

app.put('/api/persons/:id', (request, response) => {
  let { id } = request.params;

  const { name, number } = request.body;
  id = Number(id);

  const exists = persons.find((p) => p.id === id);
  if (!exists)
    return response.status(500).json({ error: 'something went wrong' });

  const newPerson = {
    id,
    name,
    number,
  };

  persons = persons.map((p) => (p.id === id ? newPerson : p));
  response.status(200).json(newPerson);
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
