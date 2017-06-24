const entityDL = require('../../../dl/companiesDL.js');
const envelopHL = require('../../../hl/envelopHL.js');


class users {
    async GetAll(params) {
        try {
            var data = await entityDL
                .find({});
            var result = data.length !== 0 ? envelopHL.results.success : envelopHL.results.notSuccess;
            var message = data.length !== 0 ? "ok" : "No information has been found";
            return envelopHL.Fill(result, message, data);
        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }

    async GetByID(params) {
        try {
            var data = await entityDL
                .find({ "_id": params._id });
            var result = data.length !== 0 ? envelopHL.results.success : envelopHL.results.notSuccess;
            var message = data.length !== 0 ? "ok" : "No information has been found";
            return envelopHL.Fill(result, message, data[0]);
        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }

    async Create(params) {
        try {
            params.item.IsActive = true;
            var data = await entityDL.create(params.item);
            var result = envelopHL.results.success;
            var message = "ok";
            return envelopHL.Fill(result, message);

        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }

    async Update(params) {
        try {
            var query = { _id: params.query._id };
            var data = await entityDL.update(query, params.item);
            var result = envelopHL.results.success;
            var message = "ok";
            return envelopHL.Fill(result, message);

        } catch (error) {
            return envelopHL.Fill(envelopHL.results.error, error);
        }
    }
}

module.exports = new users;