/**
 * Created by azuo1228 on 10/23/2016.
 */
(function (angular) {
    'use strict';
    angular.module('IpAddressApp')
        .controller('IpManagerCtrl', ['$scope', '$rootScope', '$window', 'ipAddressConfig', '$http',
            function ($scope, $rootScope, $window, ipAddressConfig, $http) {

                var self = this;

                this.config = ipAddressConfig;
                this.IpAddr = "xxx.xxx.xxx.xxx";

                this.GetIpAddr = function () {
                    console.log("Get GetIpAddr");

                    $http.get(this.config.ipUrl).success(function (data, code) {
                        console.log('OK with code: ' + code + '!');
                        self.IpAddr = data.ip;

                    }).error(function (data, code) {
                        console.log('Error with code: ' + code + '!');
                    })['finally'](function () {

                    });
                }
            }]);
})(angular);
