(function(){
  'use strict';
  /**
   * @ngdoc function
   * @name unicorEligeApp.controller:AdminCtrl
   * @description
   * # AdminCtrl
   * Controller of the unicorEligeApp
   */
  angular.module('unicorEligeApp')
    .controller('AdminCtrl',['$scope','$state','toastr','Candidates','Users','Unicor',function ($scope,$state,toastr,Candidates,Users,Unicor){

      $scope.users = [];
      $scope.candidates = [];
      $scope.faculties = Unicor.faculty;
      $scope.semesters = Unicor.semester;

      $scope.loadCandidates = function(){
        Candidates.allCandidates().then(function(response){
          $scope.candidates = response;
        });
      };

      $scope.addCandidate = function(){
        Candidates.add($scope.newCandidate).then(function(response){
          $scope.candidates.push(response);
          $state.go('adminHome');
          toastr.success('Candidato creado exitosamente');
        }, function(response){
          toastr.error(response.message);
        });
      };

      $scope.removeCandidate = function(candidate){
        Candidates.remove(candidate._id).then(function(){
          for (var i in $scope.candidates) {
            if ($scope.candidates[i] === candidate) {
              $scope.candidates.splice(i, 1);
            }
          }
          toastr.info('Candidato eliminado');
        });
      };

      $scope.loadUsers = function(){
        Users.allUsers().then(function(response){
          $scope.users = response;
        });
      };

      $scope.addUser = function() {
        Users.add($scope.newUser).then(function(response){
          toastr.info('Usuario creado con exito');
          $scope.users.push(response);
          $state.go('students');
        }, function(response){
          toastr.error(response.message);
        });
      };

      $scope.removeUser = function(user){
        Users.remove(user._id).then(function(){
          $scope.users.map(function(currentUser, index){
            if(currentUser === user){
              $scope.users.splice(index,1);
            }
          });
          toastr.info('Usuario eliminado');
        });
      };

      $scope.$watch('newUser.faculty',function(){
        $scope.programs = [];
        if ($scope.newUser) {
          Unicor.programs.forEach(function(program){
            if (program.faculty === $scope.newUser.faculty) {
              $scope.programs.push(program.program);
            }
          });
          $scope.newUser.program = $scope.programs[0];
        }
      });

      $scope.ordenar = function(valor){
        if ($scope.orden === valor){
          $scope.orden = '-'+valor;
        } else {
          $scope.orden = valor;
        }
      };
    }]);
})();
