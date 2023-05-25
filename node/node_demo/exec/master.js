const fs = require('fs');
const child_process = require('child_process');
 
const ip = '10.8.0.34';
const pw = 'luciisgood';

const bashStr = 'bash ' + __dirname + '/scan_syslog_reboot.sh ' + ip + ' ' + pw;
    var workerProcess = child_process.exec(bashStr, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
 
    workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+code);
    });
