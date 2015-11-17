(function(){
  'use strict';
  /**
   * @ngdoc service
   * @name unicorEligeApp.Comments
   * @description
   * # Comments
   * Factory in the unicorEligeApp.
   */
  angular.module('unicorEligeApp')
    .factory('Comments',['$http','$q','Api',function ($http,$q,Api){
      return {
        getComments: function(postId){
          var deferred = $q.defer();
          $http.get(Api.url+'comments/post/'+postId).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        add: function(comment){
          var deferred = $q.defer();
          $http.post(Api.url+'comments/new', comment).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        update: function(comment){
          var deferred = $q.defer();
          $http.put(Api.url+'comments/'+comment._id, comment).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        remove: function(id){
          var deferred = $q.defer();
          $http.delete(Api.url+'comments/'+id).success(function(response){
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
