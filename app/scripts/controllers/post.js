(function(){
'use strict';
/**
 * @ngdoc function
 * @name unicorEligeApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the unicorEligeApp
 */
angular.module('unicorEligeApp')
  .controller('PostCtrl',['$rootScope','$scope','$state','$stateParams','toastr','Posts',function ($rootScope,$scope,$state,$stateParams,toastr,Posts){

    $scope.posts = [];

    $scope.myPosts = function(){
      Posts.myPosts().then(function(response){
        response.forEach(function(post){
          post.content = post.content.substring(0,150)+'...';
        });
        $scope.posts = response;
      });
    };

    $scope.readPost = function(){
      Posts.getPost($stateParams.postId).then(function(response){
        $scope.currentPost = response;
      });
    };

    $scope.createPost = function(){
      Posts.add($scope.newPost).then(function(response){
        toastr.info('Post Creado exitosamente');
        $scope.newPost = {};
        $scope.posts.push(response);
        $state.go('myPosts');
      },function(response){
        toastr.error(response.message);
      });
    };

    $scope.removePost = function(post){
      console.log('si si si');
      Posts.remove(post._id).then(function(){
        $scope.posts.forEach(function(postToTrash, index){
          if(postToTrash === post){
            $scope.posts.splice(index,1);
          }
        });
        toastr.info('Post eliminado!');
      });
    };

    $scope.newComment = function(){
      $scope.comment = {
        created: Date.now(),
        content: $scope.content,
        author: {
          name : $rootScope.currentUser.displayName,
          image: $rootScope.currentUser.image.url
        }
      };
      Posts.addComment($stateParams.postId, $scope.comment).then(function(){
        $scope.currentPost.comments.push($scope.comment);
        $scope.content = '';
      });
    };
  }]);
})();
