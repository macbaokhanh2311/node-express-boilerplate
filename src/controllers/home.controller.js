const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {authService, userService, tokenService, homeService} = require('../services');
const {home} = require("nodemon/lib/utils");

const createHome = catchAsync(async (req, res)=>{
  if(req.user.id !== req.body.user_id && req.user.role !== 'admin'){
    return res.send({
      "success": false,
      "statusCode": 409,
      "message": "Forbidden!!Cannot create home of other user!!!",
    });
  };

  const result = await homeService.createHome(req.body);
  if(result.message){
    res.status(409).send({
      "success": false,
      "statusCode": 409,
      "message": result.message,
    });
  }else{
    res.status(httpStatus.CREATED).send({
      "success": true,
      "statusCode": 200,
      "message": "Create Successful!!",
      "data":result
    });
  }

});

const getHomes = catchAsync(async (req, res)=>{
  const result = await homeService.queryHomes();
  if(!result){
    return res.send({
      "success": false,
      "statusCode": 404,
      "message": "Not Found",
    })
  };
  res.send({
    "success": true,
    "statusCode": 200,
    "message": "Get Successful!!",
    "data":result
  });
});

const getHome = catchAsync(async (req, res)=>{
  const home = await homeService.getHomeById(req.params.homeId);
  if(!home){
    throw new ApiError(httpStatus.NOT_FOUND, 'Home not found');
    res.send({
      "success": false,
      "statusCode": 404,
      "message": "Not Found!!",
    });
  }
  res.send({
    "success": true,
    "statusCode": 200,
    "message": "Get Successful!!",
    "data":home
  });
});

const updateHome = catchAsync(async (req, res)=>{
  try {
    const home = await homeService.updateHomeById(req.params.homeId, req.body);
    req.home =home;
  }catch (err){
    res.send({
      "success": false,
      "statusCode": 400,
      "message": "Update Fail",
    });
  }
  res.send({
    "success": true,
    "statusCode": 200,
    "message": "Update Successful!!",
    "data" : req.home,
  });
});

const deleteHome = catchAsync(async (req, res)=>{
  try {
    await homeService.deleteHomeById(req.params.homeId);
    console.log('Deleted!!');
    res.send({
      "success": true,
      "statusCode": 200,
      "message": "Delete Successful!!",
    });
  }catch(err){
    console.log('Fail deleted');
    res.send({
      "success": false,
      "statusCode": 400,
      "message": "Delete Fail",
    });
  }

});

module.exports = {
  createHome,
  getHomes,
  getHome,
  updateHome,
  deleteHome,
};
