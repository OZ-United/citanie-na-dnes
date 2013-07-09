'use strict';

angular.module('dashboardApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/auth', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/', {
        templateUrl: '/views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
