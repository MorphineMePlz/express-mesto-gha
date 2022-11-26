// eslint-disable-next-line import/no-unresolved
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.log(err)
    });
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.send({ data: user });
    })
    .catch((err) => {
      console.log(err)
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch((err) => {
      console.log(err)
    });
};
