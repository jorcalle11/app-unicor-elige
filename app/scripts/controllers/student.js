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
    .controller('StudentCtrl',['$rootScope','$scope','$stateParams','toastr','Candidates','Events','Posts',function ($rootScope,$scope,$stateParams,toastr,Candidates,Events,Posts){

      $scope.showProposal = true;
      $scope.showEvents = false;
      $scope.showPost = false;
    	$scope.uCandidates = [];
      $scope.uPosts = [];
      $scope.eventsCandidate = [];

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
          $scope.postSelected.comments.push($scope.comment);
          $scope.content = '';
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
