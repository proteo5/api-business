var callection = require('../../dl/collection.js');
var obj = function() {};

obj.prototype.auth = "Anonymous";

obj.prototype.GetAll = function(params) {

    return callection.Get("users", {});
};

obj.prototype.GetByUser = function(params) {

    return callection.Get("users", { "User": params.User });
};

module.exports = new obj();