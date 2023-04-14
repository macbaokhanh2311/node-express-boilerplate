const mongoose = require('mongoose');
const validator = require('validator');
const {toJSON, paginate} =require('./plugins');

const homeSchema = mongoose.Schema(
  {
    name:{
      type: String,
      required: true
    },
    domain:{
      type: String,
      required: true,
      unique: true
    },
    address:{
      location: String,
      timezone: String,
    },
    user_id:{
      type: String,
      required: true,
    }
  }
);

homeSchema.plugin(toJSON);
homeSchema.plugin(paginate);

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
