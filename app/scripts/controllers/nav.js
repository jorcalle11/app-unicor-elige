(function(){
	'use strict';
	/**
	 * @ngdoc function
	 * @name unicorEligeApp.controller:NavCtrl
	 * @description
	 * # NavCtrl
	 * Controller of the unicorEligeApp
	 */
	angular.module('unicorEligeApp')
	  .controller('NavCtrl',['$rootScope','$scope','$auth',function ($rootScope,$scope,$auth){

	  	$rootScope.currentUser = $auth.getPayload();

	  	$scope.isAuthenticated = function(){
	  		return $auth.isAuthenticated();
	  	};
	  }]);
})();
