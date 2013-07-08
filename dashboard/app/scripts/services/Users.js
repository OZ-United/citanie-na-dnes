'use strict';

angular.module('dashboardApp')
.factory('Users', function ($resource) {
  return $resource('http://citanie-na-dnes.dev/users/:userId', { userId: '@userId' }, {
    'create' : { method: 'POST', params: { } },
    'query'   : { method: 'GET', params: { }, isArray: true },
    'update'  : { method: 'PUT', params: { } },
    'remove'  : { method: 'DELETE', params: { } },
    'delete'  : { method: 'DELETE', params: { } }
  });
});
