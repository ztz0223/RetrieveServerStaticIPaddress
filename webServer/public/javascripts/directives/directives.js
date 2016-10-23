(function (angular) {
    'use strict';
    var app = angular.module('IpAddressApp');

    app.directive('ipAddress', ['$parse', 'ipAddressConfig', function ($parse, ipAddressConfig) {
        return {
            restrict: 'EA',
            templateUrl: ipAddressConfig.tplPath + '/main.html',
            controller: 'IpManagerCtrl',
            controllerAs: 'vm'
        };
    }]);

})(angular);
