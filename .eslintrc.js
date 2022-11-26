module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'linebreak-style': 0,
    indent: [2, 2],
  },
};
