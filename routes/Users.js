const router = require('express').Router();
// eslint-disable-next-line import/no-unresolved
const {
  createUser, getUsers, getUsersById, updateUser, updateAvatar,
// eslint-disable-next-line import/no-unresolved
} = require('../controllers/users');
// eslint-disable-next-line import/no-unresolved

router.get('/', getUsers);
router.get('/:userId', getUsersById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
