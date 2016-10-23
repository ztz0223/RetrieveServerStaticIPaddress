/**
 * Created by azuo1228 on 10/23/2016.
 */
(function (angular) {
        'use strict';
        angular.module('IpAddressApp')
            .controller('IpManagerCtrl', ['$scope', '$rootScope', '$window', 'ipAddressConfig',
                function ($scope, $rootScope, $window, ipAddressConfig) {
                    this.config = ipAddressConfig;
                }]);
    })(angular);
