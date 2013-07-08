'use strict';

angular.module('dashboardApp')
.controller('DashboardCtrl', function ($scope, Users) {
  $scope.users = Users.query();

  $scope.addUser = function(){
    if ($scope.addUserForm.$valid) {
      $scope.users.push($scope.user);
      $scope.user = {};
    }
  };
});
