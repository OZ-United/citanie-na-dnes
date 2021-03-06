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
      controller: 'DashboardCtrl',
      resolve: {
        users: function($q, $route, Users, Auth, $location){
          var deferred = $q.defer();
          if (!Auth.isLoggedIn()) { return deferred.reject(); }

          var logoutSession = function(data){
            if (data.status === 403) {
              Auth.logout();
              $location.path('/auth');
            }
          };

          Users.query(
            function(users){
              deferred.resolve(users);
            },
            function(data){
              logoutSession(data);
              deferred.reject();
            }
          );

          return deferred.promise;
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
})
.run(function($rootScope, $location, Auth){

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      console.log(next.templateUrl);
      console.log(Auth.isLoggedIn());
      if (!Auth.isLoggedIn() ) {
        if (next.templateUrl !== '/views/auth.html') {
          $location.path('/auth');
        }
      }
      else {
        if (next.templateUrl === '/views/auth.html') {
          $location.path('/');
        }
      }
    });
  });
