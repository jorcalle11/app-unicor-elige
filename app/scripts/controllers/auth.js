(function(){
	'use strict';
/**
 * @ngdoc function
 * @name unicorEligeApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the unicorEligeApp
 */
	angular.module('unicorEligeApp')
	  .controller('AuthCtrl',['$rootScope','$scope','$auth','$state','toastr',function ($rootScope,$scope,$auth,$state,toastr){
	  	$scope.login = function(){
		  	$auth.login($scope.user).then(function(response){
	        toastr.success('Inicio de sesión exitoso :)',response.status);
		  		if ($auth.getPayload().role === 'admin'){
						$state.go('adminHome');
		  		} else if ($auth.getPayload().role === 'candidato'){
		  				$state.go('perfil');
		  			} else if ($auth.getPayload().role === 'estudiante') {
		  				$state.go('studentHome');
		  			}
		  		$rootScope.currentUser = $auth.getPayload();
		  	})
		  	.catch(function(response){
		  		toastr.error(response.data.message, response.status);
		  	});
	  	};

	    if (!$auth.isAuthenticated()) { return; }
	    $auth.logout()
	      .then(function() {
	      	delete $rootScope.currentUser;
	        toastr.info('Has cerrado sesión, vuelve pronto');
	        $state.go('home');
	      });

	  }]);
})();
