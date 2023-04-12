const mongoose = require('mongoose');
const process = require('process');

if (process.argv.length < 3) {
  console.log('incorrect parameters');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://willy-vasquez:${password}@cluster0.gmonzsa.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Persons = mongoose.model('persons', personSchema);

if (process.argv.length === 3) {
  Persons.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Persons({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('incorrect parameters');
  process.exit(1);
}
