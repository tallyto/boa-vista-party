/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');

class MongoDB {
  constructor() {
    this.dev = 'mongodb://localhost:27017/party';
    this.production = 'your_mongo_url';
  }

  ConnectProduction() {
    return mongoose.connect(this.production, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  ConnectDev() {
    return mongoose.connect(this.dev, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

module.exports = MongoDB;
