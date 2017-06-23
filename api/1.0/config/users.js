var usersDL = require('../../../dl/usersDL.js');
var companiesDL = require('../../../dl/companiesDL.js');
var envelopHL = require('../../../hl/envelopHL.js');

class users {
    async GetAll(params) {
        try {
            var data = await usersDL.find({ "Company": params.auth.CompanyID });
            var result = data.length !== 0 ? envelopHL.results.success : envelopHL.results.notSuccess;
            var message = data.length !== 0 ? "ok" : "No information has been found";
            return envelopHL.Fill(result, message, data);
        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }

    async GetByUser(params) {
        try {
            var data = await usersDL.find({ $and: [{ "User": params.User }, { "Company": params.auth.CompanyID }] })
                .populate("Company").exec();
            var result = data.length !== 0 ? envelopHL.results.success : envelopHL.results.notSuccess;
            var message = data.length !== 0 ? "ok" : "No information has been found";
            return envelopHL.Fill(result, message, data[0]);
        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }
}

module.exports = new users;