'use strict';

angular.module('dashboardApp', ['ngResource', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/auth', {
        templateUrl: '/views/auth.html',
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
