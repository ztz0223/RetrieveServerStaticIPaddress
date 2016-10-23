var express = require('express');
var router = express.Router();

var fs = require('fs');

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
            res.status(400);
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

        res.status(400);
        return;
    });
});


module.exports = router;
