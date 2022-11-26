const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const router = require('./routes/users');
// eslint-disable-next-line import/no-unresolved
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use('/users', router);
app.use('/cards', routerCards);

app.use((req, res, next) => {
  req.user = {
    _id: '6381e9741c7f7dce04ae362d',
  };
  next();
});


async function run() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();
