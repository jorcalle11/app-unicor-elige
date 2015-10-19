(function(){
  'use strict';
  /**
   * @ngdoc service
   * @name unicorEligeApp.Profile
   * @description
   * # Profile
   * Factory in the unicorEligeApp.
   */
  angular.module('unicorEligeApp')
    .factory('Profile',['$http','$q','$auth','Api',function ($http, $q, $auth, Api){
      return {
        getProfile: function(){
          var deferred = $q.defer();
          $http.get(Api.url+'users/me').success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        updatePassword: function(password){
          var deferred = $q.defer();
          $http.put(Api.url+'users/changePassword/'+ $auth.getPayload().sub, password).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        updateProfile: function(data){
          var deferred = $q.defer();
          var fd = new FormData();
          for (var key in data){
            fd.append(key, data[key]);
          }
          $http.put(Api.url+'users/'+ $auth.getPayload().sub, fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          }).success(function(response){
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
