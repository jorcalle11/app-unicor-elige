(function(){
  'use strict';
  /**
   * @ngdoc function
   * @name unicorEligeApp.controller:CandidateCtrl
   * @description
   * # CandidateCtrl
   * Controller of the unicorEligeApp
   */
  angular.module('unicorEligeApp')
    .controller('CandidateCtrl',['$scope','$auth','toastr','Candidates','Proposals',function ($scope,$auth,toastr,Candidates,Proposals){

      $scope.currentCandidate = {};

      $scope.profile = function(){
    		Candidates.profile().then(function(response){
    			$scope.currentCandidate = response;
    		}, function(response){
    			toastr.error(response.mensage);
    		});
    	};

      $scope.updateProfile = function(){
        Candidates.update($scope.currentCandidate).then(function(response){
          toastr.info('Perfil Actualizado!');
          $scope.currentCandidate = response;
        });
      };

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          toastr.success('Perfil de ' + provider + ' vinculado exitosamente');
          $scope.profile();
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };
    $scope.unlink = function(provider) {
      Candidates.update({_id:$scope.currentCandidate._id, provider: provider}).then(function(){
        toastr.info('Se desvinculó la cuenta de '+provider);
        $scope.profile();
      });
    };

      $scope.showFormToEdit = function(proposal){
        $scope.proposalToEdit = {};
        $('#formAddProposal').hide();
        $('#formUpdateProposal').show();
        $scope.proposalToEdit = proposal;
      };

      $scope.addProposal = function(){
        Proposals.add($scope.newProposal).then(function(response){
          $scope.currentCandidate.proposals.push(response);
          toastr.info('Propuesta agregada');
           $scope.newProposal = {};
        });
      };

      $scope.updateProposal = function(){
        Proposals.update($scope.proposalToEdit).then(function(response){
          $scope.currentCandidate.proposals.map(function(proposal, index){
          if (proposal._id === response._id) {
            $scope.currentCandidate.proposals[index] = response;
          }
        });
        delete $scope.proposalToEdit;
        $('#formUpdateProposal').hide();
        $('#formAddProposal').show();
          toastr.info('Propuesta actualizada');
        }, function(response){
          console.log(response);
        });
      };

      $scope.removeProposal = function(proposal){
        Proposals.remove(proposal._id).then(function(){
          $scope.currentCandidate.proposals.map(function(element, index){
            if (element === proposal) {
              $scope.currentCandidate.proposals.splice(index,1);
            }
          });
          toastr.info('Propuesta eliminada');
        });
      };
    }]);
})();
