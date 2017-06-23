var jwt = require('jsonwebtoken');
var usersDL = require('../../../dl/usersDL.js');
var companiesDL = require('../../../dl/companiesDL.js');
var envelopHL = require('../../../hl/envelopHL.js');

class auth {
    //params: User, Password
    async Login(params) {
        try {
            var data = await usersDL.find({ "User": params.User }).populate("Company").exec();;
            if (data.length == 0) {
                return envelopHL.Fill(envelopHL.results.notSuccess, "User not found");
            } else if (data[0].Password != params.Password) {
                return envelopHL.Fill(envelopHL.results.notSuccess, "Wrong Password");
            } else {
                var data2 = {
                    User: data[0].User,
                    Names: data[0].Names,
                    LastNames: data[0].LastNames,
                    Company: data[0].Company.Company
                };
                var data3 = {
                    user: data2,
                    token: jwt.sign({
                        UserID: data[0]._id,
                        CompanyID: data[0].Company._id,
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12)
                    }, params.secret)
                }
                return envelopHL.Fill(envelopHL.results.success, "ok", data3);
            }
        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    };

    async status(params) {
        try {
            var decoded = jwt.verify(params.token, params.secret);
            return envelopHL.Fill(envelopHL.results.success, "ok", decoded);
        } catch (error) {
            var result = envelopHL.results.error;
            if (error = "invalid signature")
                result = envelopHL.results.notSuccess

            return envelopHL.Fill(result, error);
        }
    };
}

module.exports = new auth();