(function(){
  'use strict';
  /**
   * @ngdoc function
   * @name unicorEligeApp.controller:EventCtrl
   * @description
   * # EventCtrl
   * Controller of the unicorEligeApp
   */
  angular.module('unicorEligeApp')
    .controller('EventCtrl',['$scope','$compile','$uibModal','Events',function ($scope,$compile,$uibModal,Events){

      $scope.events = [];

      $scope.loadEvents = function(){
        Events.myEvents().then(function(response){
          response.map(function(data){
            data.start = new Date(data.start);
            data.end = new Date(data.end);
            $scope.events.push(data);
          });
        });
      };

      $scope.onDayClick = function (date) {
        var modalAddEvent = $uibModal.open({
          animation: true,
          template: '<div><div class="modal-header"><h3 class="modal-title text-center">Agregar Evento</h3></div><div class="modal-body" name="addEventForm" novalidate></div><form name="addEventForm" class="modal-body"><div class="form-group"><label for="title">Titulo: </label><input class="form-control " type="text" name="title" ng-model="newEvent.title" placeholder="Nombre del evento" required><div class="help-block" ng-if="addEventForm.title.$dirty" ng-messages="addEventForm.title.$error"><div ng-message="required">Escriba El titulo del Evento</div></div></div><div class="form-group"><label for="place">Lugar: </label><input class="form-control " type="text" name="place" ng-model="newEvent.place" placeholder="Lugar del evento" required><div class="help-block" ng-if="addEventForm.place.$dirty" ng-messages="addEventForm.place.$error"><div ng-message="required">Escriba el Lugar donde se realizará el evento</div></div></div><div class="form-group"><label for="time">Hora : </label><div class="input-group date" id="datetimepicker3"><input  id="timeStart" type="text" name="time" class="form-control" required/><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span></div></div><div class="form-group"><strong>Fecha: </strong><span>{{newEvent.start | date:"MMM d, y"}}</span></div><script>$(function () {$("#datetimepicker3").datetimepicker({format: "H:mm"});});</script></form><div class="modal-footer"><button class="btn btn-primary" type="button" ng-disabled="addEventForm.$invalid" ng-click="ok()">Guardar</button><button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button></div></div>',
          controller: 'modalAddEventCtrl',
          size: 'sm',
          resolve: {
            date : function (){
              return date.format();
            }
          }
        });
        modalAddEvent.result.then(function (eventoOk) {
          Events.add(eventoOk).then(function(response){
            $scope.events.push(response);
          });
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      $scope.onEventClick = function (calEvent){
        var modalViewEvent = $uibModal.open({
          animation: true,
          template: '<div><div class="modal-header"><h3 class="text-center"><span>{{viewEventClicked.title}}</span></h3></div><div class="modal-body"><strong>Fecha </strong> : <span>{{viewEventClicked.start | date:"longDate"}}</span><br><strong>Hora </strong> : <span>{{viewEventClicked.start | date:"h:mma"}}</span><br><strong>Lugar</strong> : <span>{{viewEventClicked.place}}</span></div><div class="modal-footer"><a class="btn btn-success" ng-click="ok()">Ok</a></div></div>',
          controller: 'modalViewEventCtrl',
          size: 'sm',
          resolve: {
            evClicked : function (){
              return calEvent;
            }
          }
        });
        modalViewEvent.result.then(function (eventoOk) {
          console.log('Modal dismissed at: ' + new Date());
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      $scope.eventRender = function(event,element) {
        element.attr({'tooltip': event.title,'tooltip-append-to-body': true});
        $compile(element)($scope);
      };

      $scope.editEvent = function(eventToUpdate) {
        var modalEditEvent = $uibModal.open({
          animation: true,
          template: '<div><div class="modal-header"><h3 class="modal-title text-center">Editar Evento</h3></div><div class="modal-body"><div class="form-group"><label for="title">Titulo: </label><input class="form-control " type="text" name="title" ng-model="eventEdit.title" placeholder="Ingresa el nombre del evento"></div><div class="form-group"><label for="place">Lugar: </label><input class="form-control " type="text" name="place" ng-model="eventEdit.place" placeholder="Ingresa el nombre del lugar donde se realizará el evento"></div><div class="form-group"><label for="time">Hora : </label><div class="input-group date" id="datetimepicker3"><input  id="timeEdit" type="text" name="time" class="form-control" ng-model="timeEdit"><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span></div><script type="text/javascript">$(function () {$("#datetimepicker3").datetimepicker({format: "H:mm"});});</script></div><div class="form-group"><strong>Fecha: </strong><span ng-bind="date"></span></div></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button><button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button></div></div>',
          controller: 'modalEditEventCtrl',
          size: 'sm',
          resolve: {
            eventToUpdate : function (){
              return eventToUpdate;
            }
          }
        });
        modalEditEvent.result.then(function (eventoOk) {
          var eventEdit = {
            _id: eventoOk._id,
            title: eventoOk.title,
            place: eventoOk.place,
            start: eventoOk.start
          };
          Events.update(eventEdit).then(function(){
            $scope.events.map(function(element){
              if (element._id === eventEdit._id) {
                element.title = eventEdit.title;
                element.place = eventEdit.place;
                element.start = eventEdit.start;
              }
            });
          });
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      $scope.remove = function(eventToRemove) {
        Events.remove(eventToRemove._id).then(function(){
          $scope.events.map(function(element, index){
            if (element === eventToRemove) {
              $scope.events.splice(index, 1);
            }
          });
        });
      };

      $scope.uiConfig = {
        calendar:{
          lang: 'es',
          timeFormat : 'h:mm a',
          timezone: 'local',
          header:{
            right: 'today, prev,next'
          },
          dayClick: $scope.onDayClick,
          eventClick : $scope.onEventClick,
          eventRender : $scope.eventRender,
          viewRender: $scope.viewRender
        }
      };

      $scope.eventSources = [$scope.events];

    }])

  	.controller('modalViewEventCtrl',['$scope','$modalInstance','evClicked',function ($scope,$modalInstance,evClicked){

      $scope.viewEventClicked = evClicked;
  	  $scope.viewEventClicked.start = moment(evClicked.start).format();

      $scope.ok = function (action){
  	    $modalInstance.close();
  	  };

  	  $scope.cancel = function () {
  	    $modalInstance.dismiss('cancel');
  	  };
  	}])

  	.controller('modalAddEventCtrl',['$scope','$modalInstance','date',function ($scope,$modalInstance,date){

      $scope.newEvent = {};
  	  $scope.newEvent.start = moment(date).format('LL');
  	  $scope.ok = function (){
  	    var timeAdd = document.getElementById('timeStart');
  	    var fecha = date.split('-');
  	    var hora = timeAdd.value.split(':');
  	    $scope.newEvent.start = new Date(Number(fecha[0]), Number(fecha[1])-1, Number(fecha[2]), Number(hora[0]), Number(hora[1]));
  	    $scope.newEvent.end = $scope.newEvent.start;
  	    $modalInstance.close($scope.newEvent);
  	  };

  	  $scope.cancel = function () {
  	    $modalInstance.dismiss('cancel');
  	  };
  	}])

  	.controller('modalEditEventCtrl',['$scope','$modalInstance','eventToUpdate',function ($scope,$modalInstance,eventToUpdate){

  	  $scope.eventEdit = eventToUpdate;
  	  $scope.timeEdit = moment($scope.eventEdit.start).format('H:m');
  	  $scope.date = moment($scope.eventEdit.start).format('LL');

  	  $scope.ok = function (){
        var date = new Date($scope.eventEdit.start);
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var time = document.getElementById('timeEdit').value.split(':');
        $scope.eventEdit.start = new Date(y,m,d,time[0],time[1]);
  	    $modalInstance.close($scope.eventEdit);
  	  };

  	  $scope.cancel = function () {
  	    $modalInstance.dismiss('cancel');
  	  };
  	}]);
})();
