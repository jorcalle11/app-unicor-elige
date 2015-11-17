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
  .controller('PostCtrl',['$rootScope','$scope','$state','$stateParams','toastr','Posts','Comments',function ($rootScope,$scope,$state,$stateParams,toastr,Posts,Comments){

    $scope.posts = [];
    $scope.addComment = {};
    $scope.pageSize = 6;
    $scope.currentPage = 1;

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
      Posts.remove(post._id).then(function(){
        $scope.posts.forEach(function(postToTrash, index){
          if(postToTrash === post){
            $scope.posts.splice(index,1);
          }
        });
        toastr.info('Post eliminado!');
      });
    };

    $scope.loadComments = function(){
      Comments.getComments($stateParams.postId).then(function(response){
        $scope.comments = response;
      });
    };

    $scope.newComment = function(){
      $scope.addComment.created = Date.now();
      $scope.addComment.post = $stateParams.postId;

      Comments.add($scope.addComment).then(function(response){
        response.user = {},
        response.user._id = $rootScope.currentUser.sub;
        response.user.displayName = $rootScope.currentUser.displayName;
        response.user.image = $rootScope.currentUser.image;
        $scope.comments.push(response);
        $scope.addComment = {};
      });
    };

    $scope.deleteComment = function(comment){
      Comments.remove(comment._id).then(function(){
        $scope.comments.map(function(result,index){
          if (result._id === comment._id) {
            $scope.comments.splice(index,1);
          }
        });
      });
    };

    $scope.editComment = function(comment){
      $scope.formEdit = true;
      $scope.commentEdit = comment;
    };

    $scope.updateComment = function(){
      $scope.commentEdit.edited = Date.now();
      Comments.update($scope.commentEdit).then(function(){
        $scope.comments.map(function(comment){
          if (comment.id === $scope.commentEdit.id) {
            comment = $scope.commentEdit;
          }
        });
        $scope.commentEdit = {};
        $scope.formEdit = false;
        toastr.info('comentario editado');
      });
    };
  }]);
})();
