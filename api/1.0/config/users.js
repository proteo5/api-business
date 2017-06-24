const usersDL = require('../../../dl/usersDL.js');
const companiesDL = require('../../../dl/companiesDL.js');
const envelopHL = require('../../../hl/envelopHL.js');


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

    async GetByID(params) {
        try {
            var data = await usersDL
                .find({ $and: [{ "_id": params.UserID }, { "Company": params.auth.CompanyID }] })
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

    async Update(params) {
        try {
            var query = { _id: params.query._id };
            var data = await usersDL.update(query, params.user);
            var result = envelopHL.results.success;
            var message = "ok";
            return envelopHL.Fill(result, message);

        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }

    async ChangePassword(params) {
        try {
            var bcrypt = require('bcrypt');
            var dataExist = await usersDL
                .find({ $and: [{ "User": params.User }, { "Company": params.auth.CompanyID }] });
            if (dataExist.length == 0) {
                var result = envelopHL.results.notSuccess;
                var message = "User don't exist";
                return envelopHL.Fill(result, message);
            } else if (!bcrypt.compareSync(params.Password, dataExist[0].Password)) {
                return envelopHL.Fill(envelopHL.results.notSuccess, "Wrong Password");
            } else {
                var bcrypt = require('bcrypt');
                var passwordSalt = bcrypt.genSaltSync(10);
                var newPassword = bcrypt.hashSync(params.NewPassword, passwordSalt);

                var query = { $and: [{ "User": params.User }, { "Company": params.auth.CompanyID }] };
                var change = { "Password": newPassword, "PasswordSalt": passwordSalt };
                var data = await usersDL.update(query, change);
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