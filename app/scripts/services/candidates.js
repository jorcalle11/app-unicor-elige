(function(){
  'use strict';
  /**
   * @ngdoc service
   * @name unicorEligeApp.Candidates
   * @description
   * # Candidates
   * Factory in the unicorEligeApp.
   */
  angular.module('unicorEligeApp')
    .factory('Candidates',['$http','$q','Api',function ($http,$q,Api){
      return {
        allCandidates: function() {
          var deferred = $q.defer();
          $http.get(Api.url+'candidates/').success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        getCandidate: function(id){
          var deferred = $q.defer();
          $http.get(Api.url+'candidates/'+id).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        profile:function(){
          var deferred = $q.defer();
          $http.get(Api.url+'candidates/profile').success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        add : function(candidate){
          var deferred = $q.defer();
          $http.post(Api.url+'candidates/new', candidate).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        update: function(candidate){
          var deferred = $q.defer();
          $http.put(Api.url+'candidates/'+candidate._id, candidate).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        remove : function(id){
          var deferred = $q.defer();
          $http.delete(Api.url+'candidates/'+id).success(function(response){
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
