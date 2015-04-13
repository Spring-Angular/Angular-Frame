'use strict';


// Declare app level module which depends on filters, and services

var rmsApp = angular.module('vasApp', [
    'ngRoute',
    'commonDirective',
    'commonService',
    'mainController',
    'commonFilter'

]);
/*
* testing*/

rmsApp.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

rmsApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.put['Content-Type'] = 'text/plain';
    $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';


    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                    + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];
    $routeProvider.
        when('/dashboard', {
            templateUrl: 'dashboard.html'
        }).
        when('/listCatalog', {
            templateUrl: 'catalog/listCatalog.html'
        }).
        when('/addCatalog', {
            templateUrl: 'catalog/addCatalog.html'
        }).
        when('/editCatalog', {
            templateUrl: 'catalog/editCatalog.html'
        }).
        when('/listCtgTitMapping', {
            templateUrl: 'catalog_title_mapping/listCtgTitMapping.html'
        }).
        otherwise({
            redirectTo: '/dashboard'
        });
}]);


