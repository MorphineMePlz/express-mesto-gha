const router = require('express').Router();
// eslint-disable-next-line import/no-unresolved
const { createUser, getUsers, getUsersById } = require('../controllers/users');
// eslint-disable-next-line import/no-unresolved

router.get('/', getUsers);
router.get('/:userId', getUsersById);
router.post('/', createUser);

module.exports = router;
