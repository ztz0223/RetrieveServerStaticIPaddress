(function (angular) {
    'use strict';
    angular.module('IpAddressApp').provider('ipAddressConfig', function () {

        // This is for cross site url, modify this value if needed
        var xSite = 'http://127.0.0.1:3000/';

        var values = {
            appName: 'Server IP Address',
            listUrl: xSite + 'ip',
            tplPath: 'templates'
        };

        return {
            $get: function () {
                return values;
            },
            set: function (constants) {
                angular.extend(values, constants);
            }
        };

    });
})(angular);
