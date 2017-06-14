var jsonBody = require("body/json")
var http = require("http")

http.createServer(function(req, res) {
    jsonBody(req, res, function(err, body) {
        // err is probably an invalid json error 
        try {
            if (err) {
                res.statusCode = 500
                return res.end("Bad Request")
            }
            var entity = require(`./api/${body.version}/${body.entity}.js`);
            var action = entity[body.action];
            var result = action(body.data);

            res.setHeader("content-type", "application/json")
            res.end(JSON.stringify(result))
        } catch (error) {
            res.statusCode = 500
            return res.end("Bad Request: " + error)
        }
    })
}).listen(8080)