var jsonBody = require("body/json");
var http = require("http");


global.cs = 'mongodb://docebituser:0147896325@ds127132.mlab.com:27132/docebitdb';

http.createServer(function(req, res) {
    //To overcome the CORS
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow ( 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    /************************************************************/
    jsonBody(req, res, async function(err, body) {
        // err is probably an invalid json error 
        try {
            if (err) {
                res.statusCode = 500
                return res.end(`Bad Request: ${err}`)
            }
            var entity = require(`./api/${body.version}/${body.entity}.js`);
            var action = entity[body.action];
            var result = await action(body.data);

            res.setHeader("content-type", "application/json")
            res.end(JSON.stringify(result))

        } catch (error) {
            res.statusCode = 500
            return res.end("Bad Request: " + error)
        }
    })
}).listen(8080)