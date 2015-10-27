(function(){
  'use strict';
  /**
   * @ngdoc overview
   * @name unicorEligeApp
   * @description
   * # unicorEligeApp
   *
   * Main module of the application.
   */
  angular
    .module('unicorEligeApp', [
      'ngAnimate',
      'ngAria',
      'ngMessages',
      'ui.router',
      'ngSanitize',
      'ngTouch',
      'satellizer',
      'toastr',
      'ui.bootstrap',
      'ui.calendar'
    ])
    .config(['$stateProvider','$urlRouterProvider','$authProvider','Api','Rol',function ($stateProvider,$urlRouterProvider,$authProvider,Api,Rol) {

      $urlRouterProvider.otherwise('/');

      function skipIfLoggedIn($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          deferred.reject();
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      }

      function loginRequired($q, $location, $auth, toastr) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          deferred.resolve();
        } else {
          toastr.error('No estas logueado!');
          $location.path('/login');
        }
        return deferred.promise;
      }

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: null,
          resolve: {
            skipIfLoggedIn: skipIfLoggedIn
          }
        })
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'AuthCtrl',
          resolve: {
            skipIfLoggedIn: skipIfLoggedIn
          }
        })
        .state('logout',{
          url:'/logout',
          templateUrl: null,
          controller: 'AuthCtrl'
        })
        .state('forgot',{
          url:'/forgot',
          templateUrl: 'views/forgot.html',
          controller: 'ForgotCtrl',
          resolve: {
            skipIfLoggedIn: skipIfLoggedIn
          }
        })
        .state('changePassword',{
          url:'/resetearPassword/:userId',
          templateUrl: 'views/resetpassword.html',
          controller: 'ForgotCtrl',
          resolve: {
            skipIfLoggedIn: skipIfLoggedIn
          }
        })
        .state('profile', {
          url: '/mi-perfil',
          templateUrl: 'views/miperfil.html',
          controller: 'ProfileCtrl',
          resolve: {
            loginRequired: loginRequired
          }
        })
        /* routes admin */
        .state('adminHome',{
          url: '/candidatos-postulados',
          templateUrl:'views/admin/home.html',
          controller: 'AdminCtrl',
          rol: Rol.admin,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('newCandidate',{
          url: '/candidatos-postulados/nuevo',
          templateUrl:'views/admin/newCandidate.html',
          controller: 'AdminCtrl',
          rol: Rol.admin,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('students',{
          url: '/estudiantes',
          templateUrl:'views/admin/users.html',
          controller: 'AdminCtrl',
          rol: Rol.admin,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('newStudent',{
          url: '/estudiantes/nuevo',
          templateUrl:'views/admin/newUser.html',
          controller: 'AdminCtrl',
          rol: Rol.admin,
          resolve: {
            loginRequired: loginRequired
          }
        })
        /* routes candidate */
        .state('candidateHome',{
          url: '/opciones',
          templateUrl:'views/candidate/home.html',
          controller: 'CandidateCtrl',
          rol: Rol.candidate,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('perfil',{
          url: '/perfil',
          templateUrl:'views/candidate/perfil.html',
          controller: 'CandidateCtrl',
          rol: Rol.candidate,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('myEvents',{
          url: '/mis-eventos',
          templateUrl:'views/candidate/events.html',
          controller: 'EventCtrl',
          rol: Rol.candidate,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('myPosts',{
          url: '/mis-posts',
          templateUrl:'views/candidate/posts.html',
          controller: 'PostCtrl',
          rol: Rol.candidate,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('newPost',{
          url: '/mis-posts/nuevo',
          templateUrl:'views/candidate/newPost.html',
          controller: 'PostCtrl',
          rol: Rol.candidate,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('readPost',{
          url: '/mis-posts/:postId',
          templateUrl:'views/candidate/readPost.html',
          controller: 'PostCtrl',
          rol: Rol.candidate,
          resolve: {
            loginRequired: loginRequired
          }
        })
        /* routes students*/
        .state('studentHome',{
          url: '/candidatos',
          templateUrl:'views/student/home.html',
          controller: 'StudentCtrl',
          rol: Rol.student,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('profileCandidate',{
          url: '/candidatos/:candidateId',
          templateUrl:'views/student/profileCandidate.html',
          controller: 'StudentCtrl',
          rol: Rol.student,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('studentReadPost',{
          url: '/posts/:postId',
          templateUrl:'views/student/readPost.html',
          controller: 'StudentCtrl',
          rol: Rol.student,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('events',{
          url: '/eventos',
          templateUrl:'views/student/events.html',
          controller: 'StudentCtrl',
          rol: Rol.student,
          resolve: {
            loginRequired: loginRequired
          }
        })
        .state('posts',{
          url: '/posts',
          templateUrl:'views/student/posts.html',
          controller: 'StudentCtrl',
          rol: Rol.student,
          resolve: {
            loginRequired: loginRequired
          }
        })
      $authProvider.loginUrl = Api.url+'users/login';
      $authProvider.signupUrl = Api.url+'users/signup';
      $authProvider.tokenName = 'token';
      $authProvider.tokenPrefix = 'UnicorElige';
    }])
    .run(function ($rootScope, $auth, toastr){
      $rootScope.$on('$stateChangeStart',function (event, toState){
        if(toState.rol && $auth.getPayload() && (toState.rol !== $auth.getPayload().role)){
          toastr.error('Acceso denegado!');
          event.preventDefault();
        }
      });
    });

})();
