const router = require('express').Router();
const {
  getUsers, getUsersById, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

const { validateUserId, validateUserInfo, validateAvatarUpdate } = require('../middlewares/validator');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validateUserId, getUsersById);

router.patch('/me', validateUserInfo, updateUser);
router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = router;
