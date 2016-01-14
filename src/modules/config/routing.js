(function() {
  angular
    .module('aadc')
    .config(RoutingConfig);

 RoutingConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
 function RoutingConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/home");
    $urlRouterProvider.when('/home', 'main/home/dashboard');
    $stateProvider
      .state('main', {
        url: '/main',
        controller : 'MainController',
        controllerAs : 'Main',
        templateUrl: '/views/main.html'
      })
      .state('main.home', {
        url:            "/home",
        templateUrl:    "views/template.html",
      })
      .state('main.home.dashboard', {
        url:          '/dashboard',
        views:{
          "viewsHome" : {
            controllerAs: 'Home',
            controller:   'HomeController',
            templateUrl:  'views/home.html'
          }
        }
      })
      .state('main.home.detail', {
        url:          '/detail',
        views:{
          "viewsHome" : {
            controllerAs: 'Detail',
            controller:   'DetailController',
            templateUrl:  'views/detail.html'
          }
        }
      })
      .state('main.home.how', {
        url:          '/how',
        views:{
          "viewsHome" : {
            controllerAs: 'How',
            controller:   'HowController',
            templateUrl:  'views/how.html'
          }
        }
      })
      .state('main.home.gallery', {
        url:          '/gallery',
        views:{
          "viewsHome" : {
            controllerAs: 'Gallery',
            controller:   'GalleryController',
            templateUrl:  'views/gallery.html'
          }
        }
      })
      .state('main.home.questioner', {
        url:          '/questioner',
        views:{
          "viewsHome" : {
            controllerAs: 'Questioner',
            controller:   'QuestionerController',
            templateUrl:  'views/questioner.html'
          }
        }
      })
 }
}).call(this);

