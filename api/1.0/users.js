var User = function() {};
User.prototype.login = function(params) {
    params.si = "si";
    return params;
};

module.exports = new User();