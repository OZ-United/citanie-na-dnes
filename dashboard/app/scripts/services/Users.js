'use strict';

angular.module('dashboardApp')
.factory('Users', function ($resource, Auth) {
  return $resource('/users/:userId', { userId: '@userId' }, {
    'create' : { method: 'POST', params: { }, headers: Auth.getCradentials() },
    'query'   : { method: 'GET', params: { }, headers: Auth.getCradentials(), isArray: true },
    'update'  : { method: 'PUT', params: { }, headers: Auth.getCradentials() },
    'remove'  : { method: 'DELETE', params: { }, headers: Auth.getCradentials() },
    'delete'  : { method: 'DELETE', params: { }, headers: Auth.getCradentials() }
  });
});
