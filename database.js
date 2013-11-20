var mongoose = require('mongoose');

module.exports = {
  // initialize DB
  startup: function(dbToUse) {
    mongoose.connect(dbToUse);
    // check connection to mongoDB
    mongoose.connection.on('open', function() {
      console.log('We have connected to mongodb');
    });
  },
  // disconnect from database
  closeDB: function() {
    mongoose.disconnect();
  }
};
