// server/src/config.js
module.exports = {
    MONGODB_URI: process.env.MONGO_URI || 'mongodb+srv://<user>:<password>@cluster0.yvs1pu5.mongodb.net/crm',
    PORT: process.env.PORT || 5001,
  };
  
