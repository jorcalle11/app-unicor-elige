(function(){
  'use strict';
  /**
   * @ngdoc function
   * @name unicorEligeApp.controller:StudentCtrl
   * @description
   * # StudentCtrl
   * Controller of the unicorEligeApp
   */
  angular.module('unicorEligeApp')
    .controller('StudentCtrl',['$rootScope','$scope','$stateParams','toastr','Candidates','Events','Posts','Comments',function ($rootScope,$scope,$stateParams,toastr,Candidates,Events,Posts,Comments){

      $scope.showProposal = true;
      $scope.showEvents = false;
      $scope.showPost = false;
    	$scope.uCandidates = [];
      $scope.uPosts = [];
      $scope.eventsCandidate = [];
      $scope.addComment = {};
      $scope.formEdit = false;
      $scope.pageSize= 6;
      $scope.currentPage = 1;

      $scope.loadCandidates = function(){
        Candidates.allCandidates().then(function(response){
          $scope.uCandidates = response;
        });
      };

      $scope.findCandidate = function(){
        Candidates.getCandidate($stateParams.candidateId).then(function(response){
          $scope.candidateSelected = response;
    		});
    	};

      $scope.findEventsCandidate = function(){
        Events.eventsCandidate($stateParams.candidateId).then(function(response){
          $scope.eventsCandidate = response;
        });
      };

      $scope.findPostsCandidate = function(){
        Posts.postsCandidate($stateParams.candidateId).then(function(response){
          $scope.postsCandidate = response;
        });
      };

      $scope.loadPosts = function(){
        Posts.allPosts().then(function(response){
          response.map(function(post){
            post.content = post.content.substring(0,150)+'...';
          });
          $scope.uPosts = response;
        });
      };

      $scope.loadEvents = function(){
        Events.allEvents().then(function(response){
          $scope.uEvents = response;
        });
      };

      $scope.readPostCandidate = function(){
        Posts.getPost($stateParams.postId).then(function(response){
          $scope.postSelected = response;
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

      $scope.getCandidate = function(){
        console.log($scope.postSelected);
      };

      $scope.filter = function(filtro) {
        var today = new Date();
        var month = today.getMonth();
        console.log(filtro);
        if (filtro === 'today') {
          console.log('entre');
          var hoy = today.getDate();
          return function(item){
            var start = new Date(item.start).getDate();
            if (start === hoy) {
              return item;
            }
          };
        } else if (filtro === 'week') {
          var first = today.getDate() - today.getDay();
          var last = first + 6;
          //var firstDayWeek = new Date(today.setDate(first)).toUTCString();
          //var lastDayWeek = new Date(today.setDate(last)).toUTCString();
          return function(item){
            var startD = new Date(item.start).getDate();
            var startM = new Date(item.start).getMonth();
            if ( startM === month && startD >= first && startD <= last) {
              return item;
            }
          };
        } else if (filtro === 'month') {
          var firstDayofMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDate();
          var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
          return function(item){
            var startD = new Date(item.start).getDate();
            var startM = new Date(item.start).getMonth();
            if ( startM === month && startD >= firstDayofMonth && startD <= lastDayOfMonth) {
              return item;
            }
          };
        }
      };
    }]);
})();
