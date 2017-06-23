const mongoose = require('./enviroment.js');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
    User: String,
    Names: String,
    LastNames: String,
    Password: String,
    PasswordSalt: String,
    Email: String,
    Company: { type: Schema.Types.ObjectId, ref: 'companies' },
    IsActive: Boolean
}, { strict: false });

var Users = mongoose.model('users', usersSchema);

module.exports = Users;