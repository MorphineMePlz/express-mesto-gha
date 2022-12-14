const router = require('express').Router();
// eslint-disable-next-line import/no-unresolved
const {
   getUsers, getUsersById, updateUser, updateAvatar, getUserInfo,
// eslint-disable-next-line import/no-unresolved
} = require('../controllers/users');
// eslint-disable-next-line import/no-unresolved
const {validateUserId, validateUserInfo, validateAvatarUpdate} = require("../middlewares/validator")

router.get('/', getUsers);
router.get("/me", getUserInfo)
router.get('/:userId', validateUserId, getUsersById);


router.patch('/me', validateUserInfo,  updateUser);
router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);


module.exports = router;
