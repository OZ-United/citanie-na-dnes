'use strict';

angular.module('dashboardApp')
.controller('DashboardCtrl', function ($scope, Users) {
  $scope.users = Users.query();

  $scope.addUser = function(){
    if ($scope.addUserForm.$valid) {
      Users.create($scope.user, function(user){
        $scope.users.push(user);
      });
      $scope.user = {};
    }
  };

  $scope.saveUser = function(user){
    Users.update(user,
      function(){
        user.edit = false;
      },
      function(error){
        console.log(error);
      });
  };

  $scope.removeUser = function(user){
    var index = $scope.users.indexOf(user);
    if (index < 0) { return false; }

    Users.remove({'userId': user.userId}, function(){
      $scope.users.splice(index, 1);
    });
  };
});
