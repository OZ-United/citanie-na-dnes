'use strict';

angular.module('dashboardApp')
.factory('Auth', function ($q, $http, $rootScope) {
  var STORAGE_ID = 'citanie-na-dnes';
  var cradentials = JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');

  return {
    login: function (data) {
      var deferred = $q.defer();
      $http.post((window.host || '') + '/auth', data)
        .success(function(res){
          cradentials = res;
          localStorage.setItem(STORAGE_ID, JSON.stringify(res));
          $http.defaults.headers.common['hash'] = cradentials.hash;
          deferred.resolve(res);
        })
        .error(function(){
          deferred.reject();
        });

      return deferred.promise;
    },
    getCradentials: function() {
      return cradentials;
    },
    isLoggedIn: function() {
      return (cradentials.hash && cradentials.hash.length) ? true : false;
    },
    logout: function() {
      cradentials = {};
      localStorage.setItem(STORAGE_ID, JSON.stringify({}));
      $http.defaults.headers.common['hash'] = '';
      return true;
    }
  };
});
