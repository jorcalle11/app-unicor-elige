(function(){
  'use strict';
  /**
   * @ngdoc function
   * @name unicorEligeApp.controller:ProfileCtrl
   * @description
   * # ProfileCtrl
   * Controller of the unicorEligeApp
   */
  angular.module('unicorEligeApp')
    .controller('ProfileCtrl',['$rootScope','$scope','toastr','Profile',function ($rootScope,$scope,toastr,Profile){

      $scope.profile = function(){
    		Profile.getProfile().then(function(response){
    			$scope.user = response;
    		});
    	};

    	$scope.updatePassword = function(){
    		Profile.updatePassword($scope.changePassword).then(function(response){
    			toastr.info(response.message);
    		}, function(response){
    			toastr.error(response.message);
    		});
    	};

    	$scope.updateUser = function(){
    		Profile.updateProfile({displayName: $scope.user.displayName, image: $scope.user.avatar}).then(function(response){
    			$rootScope.currentUser.displayName = response.displayName;
    			$rootScope.currentUser.image = response.image;
    			$scope.user.displayName = response.displayName;
    			$scope.user.image = response.image;
    			delete $scope.user.avatar;
    			$('#divUpdateImage').hide();
    			$('#divChangeImage').show();
    			toastr.info('Perfil actualizado!');
    		});
    	};

    	$scope.changeImage = function(){
    		$('#divChangeImage').hide();
    		$('#divUpdateImage').show();
  			$('#inputUpdateImage').change(function(){
  			  renderImagePreview(this);
  			});
    	};

  		function renderImagePreview(input) {
  			if (input.files && input.files[0]) {
  				var reader = new FileReader();

  				reader.onload = function (e) {
  			    $('#imagePreview').attr('src', e.target.result);
  			    $('#divButtonsActions').show();
  				};
  				reader.readAsDataURL(input.files[0]);
  			}
  		}

  		$scope.ok = function(){
  			$('#inputUpdateImage').hide();
  			$('#divButtonsActions').hide();
  		};

  		$scope.cancel = function(){
  			$('#imagePreview').attr('src','');
    		$('#divChangeImage').show();
    		$('#divUpdateImage').hide();
  		};
    }]);
})();
