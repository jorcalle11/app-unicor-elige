(function(){
  'use strict';
  /**
   * @ngdoc service
   * @name unicorEligeApp.Proposals
   * @description
   * # Proposals
   * Factory in the unicorEligeApp.
   */
  angular.module('unicorEligeApp')
    .factory('Proposals',['$http','$q','Api',function ($http,$q,Api){
      return {
        add: function(proposal){
          var deferred = $q.defer();
          $http.post(Api.url+'proposals/new', proposal).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        update: function(proposal){
          var deferred = $q.defer();
          $http.put(Api.url+'proposals/'+proposal._id, proposal).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        remove: function(id){
          var deferred = $q.defer();
          $http.delete(Api.url+'proposals/'+id).success(function(response){
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
