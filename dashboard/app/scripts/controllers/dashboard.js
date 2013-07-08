'use strict';

angular.module('dashboardApp')
.controller('DashboardCtrl', function ($scope, Users) {
  $scope.users = Users.query();
});
