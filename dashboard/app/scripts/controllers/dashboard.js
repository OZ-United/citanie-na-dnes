'use strict';

angular.module('dashboardApp')
.controller('DashboardCtrl', function ($scope, Users) {
  $scope.users = Users.query();

  $scope.addUser = function(){
    if ($scope.addUserForm.$valid) {
      Users.create(function(user){
        $scope.users.push(user);
      });
      $scope.user = {};
    }
  };
});
