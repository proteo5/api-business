var usersDL = require('../../../dl/usersDL.js');
var companiesDL = require('../../../dl/companiesDL.js');
var envelopHL = require('../../../hl/envelopHL.js');

class users {
    async GetAll(params) {
        try {
            var data = await usersDL
                .find({ "Company": params.auth.CompanyID })
                .select("-Password -PasswordSalt");
            var result = data.length !== 0 ? envelopHL.results.success : envelopHL.results.notSuccess;
            var message = data.length !== 0 ? "ok" : "No information has been found";
            return envelopHL.Fill(result, message, data);
        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }

    async GetByUser(params) {
        try {
            var data = await usersDL
                .find({ $and: [{ "User": params.User }, { "Company": params.auth.CompanyID }] })
                .select("-Password -PasswordSalt")
                .populate("Company")
                .exec();
            var result = data.length !== 0 ? envelopHL.results.success : envelopHL.results.notSuccess;
            var message = data.length !== 0 ? "ok" : "No information has been found";
            return envelopHL.Fill(result, message, data[0]);
        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }

    async Create(params) {
        try {
            var dataExist = await usersDL
                .find({ $and: [{ "User": params.user.User }, { "Company": params.auth.CompanyID }] })
            if (dataExist.length !== 0) {
                var result = envelopHL.results.notSuccess;
                var message = "user already exist";
                return envelopHL.Fill(result, message);
            } else {
                var bcrypt = require('bcrypt');
                params.user.PasswordSalt = bcrypt.genSaltSync(10);
                params.user.Password = bcrypt.hashSync(params.user.Password, params.user.PasswordSalt);
                params.user.Company = params.auth.CompanyID;
                params.user.IsActive = true;

                var data = await usersDL.create(params.user);
                var result = envelopHL.results.success;
                var message = "ok";
                return envelopHL.Fill(result, message);
            }
        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }
}

module.exports = new users;