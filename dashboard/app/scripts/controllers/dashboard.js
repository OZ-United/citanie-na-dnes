'use strict';

angular.module('dashboardApp')
.controller('DashboardCtrl', function ($scope, Users, $http, Auth, $location) {

  var logoutSession = function(data){
    if (data.status === 403) {
      Auth.logout();
      $location.path('/auth');
    }
  };

  $scope.users = Users.query(
    function(){},
    function(data){
      logoutSession(data);
    }
  );

  $scope.addUser = function(){
    if ($scope.addUserForm.$valid) {
      Users.create($scope.user,
        function(user){
          $scope.users.push(user);
        },
        function(data){
          logoutSession(data);
        }
      );
      $scope.user = {};
    }
  };

  $scope.saveUser = function(user){
    Users.update(user,
      function(){
        user.edit = false;
      },
      function(data){
        logoutSession(data);
      }
    );
  };

  $scope.removeUser = function(user){
    var index = $scope.users.indexOf(user);
    if (index < 0) { return false; }

    Users.remove({'userId': user.userId},
      function(){
        $scope.users.splice(index, 1);
      },
      function(data){
        logoutSession(data);
      }
    );
  };

  $scope.fetch = function(){
    $http.get('/reflections/fetch').success(function(){
      console.log('ok');
    });
  };

  $scope.send = function(){
    $http.post('/notifications/reflections/last', Auth.getCradentials())
      .success(function(){
        console.log('ok');
      })
      .error(function(data){
        logoutSession(data);
      }
    );
  };

  $scope.sortFunction = function(user) {
    return user.name.split(' ').reverse().join(' ');
  };
});
