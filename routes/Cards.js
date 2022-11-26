const routerCards = require('express').Router();

const {
  createCard,
// eslint-disable-next-line import/no-unresolved
} = require('../controllers/cards');

routerCards.post('/', createCard);

module.exports = routerCards;
