const mongoose = require('mongoose');
require('dotenv').config();

const connect = function(){
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.MONGO_URL, options);
  const connection = mongoose.connection;
  // connection.once('open', ()=>{
  //   console.log('DB connection is open');
  // });
  connection.on('error', ()=>{
    console.log('Error connecting to db');
  });
  // connection.on('close', ()=>{
  //   console.log('DB Connection is closed');
  // });
  return connection;
};

module.exports = { connect };