(function(){
  'use strict';
  /**
   * @ngdoc service
   * @name unicorEligeApp.Users
   * @description
   * # Users
   * Factory in the unicorEligeApp.
   */
  angular.module('unicorEligeApp')
    .factory('Users', function ($http, $q, Api) {
      return {
        allUsers: function () {
          var deferred = $q.defer();
          $http.get(Api.url+'users/').success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        add: function(user){
          var deferred = $q.defer();
          $http.post(Api.url+'users/new', user).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        remove: function(id){
          var deferred = $q.defer();
          $http.delete(Api.url+'users/'+id).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        }
      };
    });
})();
