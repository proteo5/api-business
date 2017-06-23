const mongoose = require('./enviroment.js');

var Schema = mongoose.Schema;

var companiesSchema = new Schema({
    Company: String,
    IsActive: Boolean
}, { strict: false });

var Companies = mongoose.model('companies', companiesSchema);

module.exports = Companies;