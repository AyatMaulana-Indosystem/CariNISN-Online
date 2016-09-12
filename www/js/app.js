// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material','ng-mfb']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.main', {
        url : '/main',
        views : {
            'menuContent' : {
                templateUrl : 'templates/main.html'
            }
        }
    });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');
});


app.controller('MainCtrl', function($scope, $ionicModal){
    $ionicModal
    .fromTemplateUrl('modalNama.html',{
        scope : $scope,
        animation : 'slide-in-up'
    }).then(function(modal){
        $scope.modalNama = modal;
    });

    $ionicModal
    .fromTemplateUrl('modalNISN.html',{
        scope : $scope,
        animation : 'slide-in-up'
    }).then(function(modal){
        $scope.modalNISN = modal;
    });


    $scope.showModalNISN = function(){
        console.log(1);
        $scope.opt = 'closed';
        $scope.modalNISN.show();        
    };


    $scope.showModalNama = function(){
        console.log(1);
        $scope.opt = 'closed';
        $scope.modalNama.show();
    }


});