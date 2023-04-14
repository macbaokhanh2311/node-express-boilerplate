const httpStatus = require('http-status');
const {Home} = require('../models');
const ApiError = require('../utils/ApiError');
const {filter} = require("compression");

////////////////////////////////////////////////////////////////////
const createHome = async (homeBody) => {
  try {
    const home = await Home.create(homeBody);
    return home;
  }catch(err){
    const error = await new ApiError(httpStatus.BAD_REQUEST, err.message);
    return error;
  };
};
const queryHomes = async (filter, options) =>{
  const homes = await Home.find();
  return homes;
};

const getHomeById = async (id) =>{
  return Home.findById(id);
};

const updateHomeById = async (homeId, updateBody) =>{
  const home = await Home.findById(homeId);
  if(!home){
    throw new ApiError(httpStatus.NOT_FOUND, 'Home not found');
  };
  Object.assign(home, updateBody);
  await home.save();
  return home;

};

const deleteHomeById = async (homeId) =>{
  const home = await Home.findById(homeId);
  if(!home){
    console.log('Throw err');
    throw new ApiError(httpStatus.NOT_FOUND, 'Home not found');
  };
  await home.remove();
  return home;
};
module.exports= {
  createHome,
  getHomeById,
  queryHomes,
  updateHomeById,
  deleteHomeById,
};
