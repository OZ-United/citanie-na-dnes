'use strict';

angular.module('dashboardApp')
.controller('AuthCtrl', function ($scope, Auth, $location) {
  $scope.login = function(password){
    $scope.error = false;

    Auth.login({'password': password}).then(
      function(data){
        console.log(data);
        $location.path('/');
      },
      function(){
        $scope.error = true;
      }
    );
  };
});
