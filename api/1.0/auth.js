var jwt = require('jsonwebtoken');
var obj = function() {};

obj.prototype.auth = "Anonymous";

obj.prototype.login = function(params) {
    var data = { token: jwt.sign({ user: params.user }, 'secret shhh') };
    return data;
};

obj.prototype.logout = function(params) {
    var data = { "result": "success", "message": "The user has been logout" };
    return data;
};

obj.prototype.status = function(params) {
    try {
        var decoded = jwt.verify(params.token, 'secret shhh');
        var data = { "result": "success", "message": "The user has been logout" };
    } catch (error) {
        data = { "result": "notSuccess", "message": "The user has been logout" };
    }

    return data;
};

module.exports = new obj();