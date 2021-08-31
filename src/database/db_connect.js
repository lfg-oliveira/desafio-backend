const mongoose = require('mongoose');

mongoose.connect(`mongodb://mongodb:27017/userData`, { useNewUrlParser: true })
mongoose.Promise = global.Promise;

module.exports = mongoose;