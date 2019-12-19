const mongoose = require("mongoose");

class MongoDB {
  constructor() {
    (this.dev = "mongodb://localhost:27017/party"),
      (this.production =
        "mongodb+srv://otallyto:Rodrigues_2019@cluster0-jq9ag.mongodb.net/party?retryWrites=true&w=majority");
  }

  ConnectProduction() {
    return mongoose.connect(this.production, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  ConnectDev() {
    return mongoose.connect(this.dev, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}

module.exports = MongoDB;
