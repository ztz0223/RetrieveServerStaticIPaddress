var express = require('express');
var router = express.Router();

var fs = require('fs');
var http = require('http');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/ip', function (req, res) {
    console.log("Get Server Public Ip Address!");

    var ipAddr;
    fs.readFile('/tmp/oraylog', 'utf8', function (err, data) {
        if (err) {
            console.log("Err with " + err);
            res.status(400).send('Error');
            return;
        }
        var lines = data.split('\n');
        var schStr = 'public ip:';

        for (var line in lines) {
            var index = lines[line].indexOf(schStr);
            if (index >= 0) {
                ipAddr = lines[line].substring(index + schStr.length);
                console.log('Get a public ip: ' + ipAddr);
            }
        }

        if (ipAddr) {
            console.log('Get the last public ip: ' + ipAddr);
            res.json({ip: ipAddr});
            return;
        }

        res.status(400).send('Error');
    });
});

router.get('/ipconfig', function (req, res) {
    console.log("Get Server Public Ip Address from ifconfig.me/ip !");

    var opt = {
        host: 'ifconfig.me',
        path: '/ip',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var ipConfig = '';
    var reqInner = http.request(opt, function (resInner) {
        console.log("Got response: " + resInner.statusCode);

        if (resInner.statusCode == 200) {
            resInner.setEncoding('utf8');
            resInner.on('data', function (data) {
                console.log("Got response from /ipconfig: " + data);
                ipConfig += data;
            });

            resInner.on('end', function () {
                console.log('ipconfig is: ' + ipConfig);

                if (ipConfig) {
                    console.log('Get the ifconfig.me\'s public ip: ' + ipConfig);
                    res.json({ipconfig: ipConfig});
                }
                else {
                    res.status(400).send('Error');
                }
            });
        }

    }).on('error', function (e) {
        console.log("Got error: " + e.message);
        res.status(400).send('Error');
    });

    console.log("Waiting get ifconfig over");
    reqInner.end();
});

module.exports = router;
