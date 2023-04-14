const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const homeValidation = require('../../validations/home.validation');
const homeController = require('../../controllers/home.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createHomes'),validate(homeValidation.createHome),homeController.createHome)
  .get(auth(),validate(homeValidation.getHomes),homeController.getHomes)

router
  .route('/:homeId')
  .get(auth(),validate(homeValidation.getHome),homeController.getHome)
  .patch(auth('manageHomes'),validate(homeValidation.updateHome), homeController.updateHome)
  .delete(auth('manageHomes'),validate(homeValidation.deleteHome),homeController.deleteHome)

module.exports = router;
