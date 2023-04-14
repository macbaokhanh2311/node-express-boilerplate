const Joi = require('joi');
const {string} = require("joi");
const {objectId,domain} = require("./custom.validation");

const createHome ={
  body: Joi.object().keys({
    name: Joi.string().required().max(64),
    domain: Joi.custom(domain).required(),
    address: Joi.object().keys({
      location: Joi.string(),
      timezone: Joi.string(),
    }),
    user_id:Joi.string().required(),
  })
};

const getHomes = {
  query: Joi.object().keys({
    name: Joi.string().max(64),
    domain: Joi.string().custom(domain),
    address: Joi.object().keys({
      location: Joi.string(),
      timezone: Joi.string(),
    }),
    user_id: Joi.string(),
  }),
};

const getHome ={
  params: Joi.object().keys({
    homeId: Joi.string().custom(objectId),
  }),
};

const updateHome = {
  params: Joi.object().keys({
    homeId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().max(64),
    domain: Joi.string().custom(domain),
    address: Joi.object().keys({
      location: Joi.string(),
      timezone: Joi.string(),
    }),
  }),
};

const deleteHome ={
  params: Joi.object().keys({
    homeId: Joi.string().custom(objectId),
  }),
};

module.exports ={
  createHome,
  getHomes,
  getHome,
  updateHome,
  deleteHome,
};
