var mongo = require('./enviroment.js');

var obj = function() {};

obj.prototype.Get = function(coll, filter) {
    let database = null;
    let result2 = [];
    var p = mongo.open()
        .then((db) => {
            database = db;
            return db.collection(coll)
        })
        .then((users) => {
            result2 = users.find(filter);
            return new Promise((resolve, reject) => {
                result2.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            });
        })
        .then((result) => {
            result2 = result;
            console.log(result);
            database.close();
            return result;
        })
        .catch((err) => {
            console.error(err)
        })
    return p;
};
module.exports = new obj();