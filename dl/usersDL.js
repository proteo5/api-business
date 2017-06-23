const mongoose = require('./enviroment.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    User: String,
    Names: String,
    LastNames: String,
    Password: String,
    PasswordSalt: String,
    Email: String,
    IsActive: Boolean
});

var User = mongoose.model('User', userSchema);

module.exports = User;