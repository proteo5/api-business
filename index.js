var jsonBody = require("body/json");
var http = require("http");
var jwt = require('jsonwebtoken');
var secret = '0273d638-03d5-49a7-a23e-8e95db0c4872:d6cca124-fdee-4538-802d-4374d110d6aa'; //create your own secret

http.createServer(async function(req, res) {
    //To overcome the CORS
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow ( 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    /************************************************************/
    await jsonBody(req, res, async function(err, body) {
        // err is probably an invalid json error 
        try {
            if (err) {
                res.statusCode = 400
                return res.end(`Bad Request: ${err}`)
            }
            var auth = security(body);
            if (!auth.pass) {
                res.statusCode = 401
                return res.end(`Not autorize`)
            } else {
                if (body.entity == "auth" && body.area == "public") body.data.secret = secret;

                body.data.auth = auth;
                var entity = require(`./api/${body.version}/${body.area}/${body.entity}.js`);
                var action = entity[body.action];
                var result = await action(body.data);

                res.setHeader("content-type", "application/json")
                res.end(JSON.stringify(result))
            }
        } catch (error) {
            res.statusCode = 500
            return res.end("Internal Error: " + error)
        }
    })
}).listen(8080);

var security = function(body) {
    try {
        if (body.area == "public")
            return { pass: true };

        var auth = jwt.verify(body.token, secret);
        auth.pass = true;
        return auth;
    } catch (error) {
        //invalid token or expired token
        return { pass: false };
    }
}