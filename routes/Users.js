const router = require('express').Router();
// eslint-disable-next-line import/no-unresolved
const {
   getUsers, getUsersById, updateUser, updateAvatar, getUserInfo,
// eslint-disable-next-line import/no-unresolved
} = require('../controllers/users');
// eslint-disable-next-line import/no-unresolved

router.get('/', getUsers);
router.get('/:userId', getUsersById);
router.get("/users/me", getUserInfo)


router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);


module.exports = router;
