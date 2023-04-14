const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const {Home} = require("../models");


const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user,info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate').message);
  }
  req.user = user;
  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden').message);
    }
    ;
    if (req.params.homeId) {
      const home = await Home.findById(req.params.homeId,{},(err, user)=>{
        if(!user){
          return reject(new ApiError(httpStatus.BAD_REQUEST, 'Home Not Found!!!'));
        }
      });
      if(home) {
        if (hasRequiredRights && home.user_id !== user.id && user.role !== 'admin') {
          return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        };
      }
    }
  }

  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((message) => next(res.status(401).send({
      "success": false,
      "statusCode": 401,
      "message": `${message}`,
    })));
};

module.exports = auth;

///////////////////////////////////////////////////////////////////////////////////////////////////
// const passport = require('passport');
// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
// const { roleRights } = require('../config/roles');
//
// function verifyCallback(req, resolve, reject, requiredRights) {
//   return async function(err, user, info) {
//     if (err || info || !user) {
//       return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
//     }
//     req.user = user;
//
//     if (requiredRights.length) {
//       const userRights = roleRights.get(user.role);
//       const hasRequiredRights = requiredRights.every(function(requiredRight) {
//         return userRights.includes(requiredRight);
//       });
//       if (!hasRequiredRights && req.params.userId !== user.id) {
//         return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
//       }
//     }
//
//     resolve();
//   };
// }
//
// function auth(...requiredRights) {
//   return async function(req, res, next) {
//     return new Promise(function(resolve, reject) {
//       passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
//     })
//       .then(function() {
//         next();
//       })
//       .catch(function(err) {
//         next(err);
//       });
//   };
// }
//
// module.exports = auth;
//
// verifyCallback();
