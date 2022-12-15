const routerCards = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validateCardCreation, validateCardId } = require('../middlewares/validator');

routerCards.get('/', getCards);
routerCards.post('/', validateCardCreation, createCard);
routerCards.delete('/:cardId', validateCardId, deleteCard);
routerCards.put('/:cardId/likes', validateCardId, likeCard);
routerCards.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = routerCards;
