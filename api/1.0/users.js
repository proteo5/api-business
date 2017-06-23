var usersDL = require('../../dl/usersDL.js');

class users {
    async GetAll() {
        return await usersDL.find({});
    }

}


module.exports = new users;