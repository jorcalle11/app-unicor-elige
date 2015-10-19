(function(){
  'use strict';
  /**
   * @ngdoc function
   * @name unicorEligeApp.controller:ForgotCtrl
   * @description
   * # ForgotCtrl
   * Controller of the unicorEligeApp
   */
  angular.module('unicorEligeApp')
    .controller('ForgotCtrl',['$scope','$location','$stateParams','toastr','Forgot',function ($scope,$location,$stateParams,toastr,Forgot) {

    	$scope.findUser = function(){
    		Forgot.find($scope.searchUser).then(function(response){
    			toastr.warning(response.message);
          $scope.searchUser = {};
    		},function(response){
    			toastr.error(response.message);
    		});
    	};

    	$scope.reset = function(){
    		Forgot.resetPassword($stateParams.userId, $scope.password).then(function(response){
    			toastr.info(response.message);
    			$location.path('/login');
    		},function(response){
    			toastr.error(response.message);
    		});
    	};
    }]);
})();
