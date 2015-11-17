(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name unicorEligeApp.controller:ResultCtrl
	 * @description
	 * # ResultCtrl
	 * Controller of the unicorEligeApp
	 */
	angular.module('unicorEligeApp')
	  .controller('ResultCtrl', ['$rootScope','$scope','Candidates','Profile',function ($rootScope, $scope, Candidates, Profile) {
		  $scope.candidates =[];
	    $scope.chartObject = {};

	    $scope.chartObject.type = "ColumnChart";

	    $scope.chartObject.data = [
       ['Component', 'Votos']
      ];

      $scope.chartObject.options = {
      	colors: ['#E6EE9C','#C5E1A5']
      };

		  $scope.getUser = function(){
		  	Profile.getProfile().then(function(response){
		  		$scope.user = response;
		  		$rootScope.currentUser.votation = response.votation;
		  	});
		  };

		  $scope.loadCandidates = function(){
		  	Candidates.allCandidates().then(function(response){
		  		$scope.candidates = response;
		  		response.map(function(candidate){
		  			$scope.chartObject.data.push([candidate.user.displayName, candidate.popularity]);
		  		});
		  	});
		  };

		  $scope.votar = function(candidate){
		  	Profile.updateProfile({votation : true, candidate: candidate._id}).then(function(){
		  		console.log('votaste por '+ candidate.user.displayName);
		  		$scope.chartObject.data.map(function(array){
		  			if (array[0] === candidate.user.displayName) {
		  				array[1] += 1;
		  			}
		  		});
		  		$scope.getUser();
		  	});
		  };
	  }]);
})();
