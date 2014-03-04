'use strict';

angular.module('dashboardApp', ['ngResource', 'ngRoute'])
.config(function ($routeProvider) {
  $routeProvider
    .when('/auth', {
      templateUrl: '/views/auth.html',
      controller: 'AuthCtrl'
    })
    .when('/', {
      templateUrl: '/views/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.run(function($rootScope, $location, Auth){

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      console.log(next.templateUrl);
      console.log(Auth.isLoggedIn());
      if ( !Auth.isLoggedIn() ) {
        if ( next.templateUrl !== 'views/auth.html' ) {
          $location.path( '/auth' );
        }
      }
      else {
        if ( next.templateUrl === 'views/auth.html' ) {
          $location.path( '/' );
        }
      }
    });
  });
