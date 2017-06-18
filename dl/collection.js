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
        .then((coll) => {
            let data = coll.find(filter);
            return new Promise((resolve, reject) => {
                data.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            });
        })
        .then((docs) => {
            database.close();
            let envelop = {
                "result": docs.length != 0 ? "success" : "notsuccess",
                "message": "",
                "data": docs
            }
            return envelop;
        })
        .catch((err) => {
            let envelop = {
                "result": "error",
                "message": err
            }
            console.error(envelop)
        })
    return p;
};
module.exports = new obj();