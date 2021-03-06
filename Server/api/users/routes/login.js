'use strict';

const User = require('../models/User');
const authenticateUser = require('../util/userFunctions').authenticateUser;
const formatUser = require('../util/userFunctions').formatUser;
const createToken = require('../util/token');
const Boom = require('boom');

module.exports = {
  method: 'POST',
  path: '/login',
  config: {
    // Validate the payload against the Joi schema
    pre: [{
      method: authenticateUser,
      assign: 'user'
    }],
    auth: 'userPass', // Requires basic auth (username:password)
  },
  handler: (req, res) => {
    User.findById(req.Credentials.id, (err, user) => {
      // returns some non-sensitive informations about the user
      // TODO: [2] Should alse set cookie with the jwt
      if (err) {
        res(Boom.unauthorized('user not found'));
      }
      if (!user) {
        res(Boom.unauthorized('user not found'));
      }
      res(formatUser(user)).code(200);
    });
  }
};
