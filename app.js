const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

// eslint-disable-next-line import/no-unresolved
const router = require('./routes/users');

// eslint-disable-next-line import/no-unresolved
const routerCards = require('./routes/cards');
const {
  createUser, login,

} = require('./controllers/Users');

const { notFound } = require('./controllers/NotFound');
const auth = require('./middlewares/auth');
const { validateLogin } = require('./middlewares/validator');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(helmet());

app.post('/signup', validateLogin, createUser);
app.post('/signin', validateLogin, login);

app.use('/users', auth, router);
app.use('/cards', auth, routerCards);
app.use('*', notFound);

app.use((err, req, res) => {
  const { status = 500, message } = err;
  res
    .status(status)
    .send({
      message: status === 500
        ? 'Ошибка сервера'
        : message,
    });
});

async function start() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
