(function(){
  'use strict';
  /**
   * @ngdoc service
   * @name unicorEligeApp.Forgot
   * @description
   * # Forgot
   * Factory in the unicorEligeApp.
   */
  angular.module('unicorEligeApp')
    .factory('Forgot',['$http','$q','Api',function ($http,$q,Api){
      return {
        find: function(user){
          var deferred = $q.defer();
          $http.post(Api.url+'users/forgotPassword', user).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        resetPassword: function(id, password){
          var deferred = $q.defer();
          $http.put(Api.url+'users/resetPassword/'+id, password).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        }
      };
    }]);
})();
