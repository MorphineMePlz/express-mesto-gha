const express = require('express');
const mongoose = require('mongoose');

// eslint-disable-next-line import/no-unresolved
const router = require('./routes/users');
// eslint-disable-next-line import/no-unresolved
const routerCards = require('./routes/cards');
const {
  createUser, login,
// eslint-disable-next-line import/no-unresolved
} = require('./controllers/Users');
// eslint-disable-next-line import/no-u

const { notFound } = require('./controllers/NotFound');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', auth, router);
app.use('/cards', auth, routerCards);
app.use('*', notFound);

async function run() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();
