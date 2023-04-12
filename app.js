require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const unknownEndpoint = require('./middleware/unknowEndpoint');
const requestLogger = require('./middleware/requestLogger');

connectDB();

const app = express();

morgan('tiny');
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :response-time ms :body'));

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(requestLogger);

app.use('/info', require('./routes/info'));
app.use('/api/persons', require('./routes/persons'));

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
