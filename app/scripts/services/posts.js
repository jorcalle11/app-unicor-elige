(function(){
  'use strict';
  /**
   * @ngdoc service
   * @name unicorEligeApp.Posts
   * @description
   * # Posts
   * Factory in the unicorEligeApp.
   */
  angular.module('unicorEligeApp')
    .factory('Posts',['$http','$q','Api',function ($http,$q,Api){
      return {
        allPosts: function(){
          var deferred = $q.defer();
          $http.get(Api.url+'posts/').success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        getPost: function(id){
          var deferred = $q.defer();
          $http.get(Api.url+'posts/'+id).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        myPosts: function(){
          var deferred = $q.defer();
          $http.get(Api.url+'posts/me').success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        postsCandidate: function(id){
          var deferred = $q.defer();
          $http.get(Api.url+'posts/candidates/'+id).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        add: function(data){
          var deferred = $q.defer();
          var fd = new FormData();
          for (var key in data){
            fd.append(key, data[key]);
          }

          $http.post(Api.url+'posts/new', fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          }).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        addComment: function(id, post){
          var deferred = $q.defer();
          $http.put(Api.url+'posts/newComment/'+id, post).success(function(response){
            deferred.resolve(response);
          })
          .error(function(response){
            deferred.reject(response);
          });
          return deferred.promise;
        },
        remove : function(id){
          var deferred = $q.defer();
          $http.delete(Api.url+'posts/'+id).success(function(response){
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
