(function(){
  'use strict';
  /**
   * @ngdoc service
   * @name unicorEligeApp.Events
   * @description
   * # Events
   * Factory in the unicorEligeApp.
   */
  angular.module('unicorEligeApp')
    .factory('Events',['$http','$q','Api',function ($http,$q,Api){
      return {
        allEvents : function(){
          var deferred = $q.defer();
          $http.get(Api.url+'events/').success(function(response){
              deferred.resolve(response);
          }).error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        myEvents : function(){
          var deferred = $q.defer();
          $http.get(Api.url+'events/me').success(function(response){
              deferred.resolve(response);
          }).error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        eventsCandidate: function(id){
          var deferred = $q.defer();
          $http.get(Api.url+'events/candidateEvents/'+id).success(function(response){
              deferred.resolve(response);
          }).error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        add : function(newEvent){
          var deferred = $q.defer();
          $http.post(Api.url+'events/new',newEvent).success(function(response){
              deferred.resolve(response);
          }).error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        update: function(updateEvent){
          var deferred = $q.defer();
          $http.put(Api.url+'events/'+updateEvent._id, updateEvent).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        remove : function(id){
          var deferred = $q.defer();
          $http.delete(Api.url+'events/'+id).success(function(response){
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
