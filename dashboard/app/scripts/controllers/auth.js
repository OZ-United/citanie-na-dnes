'use strict';

angular.module('dashboardApp')
.controller('AuthCtrl', function ($scope, Auth, $location) {
  $scope.login = function(password){
    $scope.error = false;

    Auth.login({'password': password}).then(
      function(){
        $location.path('/');
      },
      function(){
        $scope.error = true;
      }
    );
  };
});
