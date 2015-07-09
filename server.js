'use strict';

const P = require('bluebird'),
    async = P.coroutine,
    cluster = require('cluster'),
    http = require('http'),
    os = require('os'),
    _ = require('lodash');

const listenPort = parseInt(process.env.LISTEN_PORT) || 8080;
const workerCount = parseInt(process.env.WORKER_COUNT) || 1;

process.on('SIGTERM', function() {
    print('Received SIGTERM');

    if(workerCount > 1) {
        _.each(cluster.workers, function(w, wid) {
            print('Sending SIGTERM: ' + wid);
            w.kill('SIGTERM');
        });
    } else {
        print('Terminating');
        process.exit(0);
    }
});

function print(s) {
    console.log('[' + (cluster.isMaster ? 'M' : 'S') + ':' +
        process.pid + '] ' + s);
}

function printEnvs() {
    print('$ENV1=' + process.env.ENV1);
    print('$ENV2=' + process.env.ENV2);
}

const startMaster = async(function* () {
    print('Starting...');
    printEnvs();

    print('Starting workers: ' + workerCount);
    _.times(workerCount, function() {
        cluster.fork();
    });

    cluster.on('exit', function(worker) {
        print('Worker ' + worker.process.pid + ' exited.');
    });
});

const startWorker = async(function* () {
    print('Starting...');
    printEnvs();

    let reqCount = 0;
    http.createServer(function(req, res) {
        print('Request [' + (reqCount++) + ']: ' + req.url);
        res.writeHead(200);
        res.end("ok\n");
    }).listen(listenPort);
});

if(workerCount > 1) {
    if(cluster.isMaster) {
        startMaster();
    } else {
        startWorker();
    }
} else {
    startWorker();
}
