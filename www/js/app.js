// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material','ng-mfb','ionic-datepicker']);

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
                templateUrl : 'templates/main.html',
                controller : 'MainCtrl'
            }
        }
    })

    .state('app.outputNISN', {
      url : '/outputNISN',
      views : {
          'menuContent' : {
            templateUrl : 'templates/output/outputNISN.html'
          }
      }
    });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');
});


// Factory
// app.factory('getNISNByNama', function($http, $scope, param){
//     if(param == "nisn") {
//         $getNISN = $http.get("http://ibacor.com/api/data-siswa",{
//             params : {
//                 'nisn' : $scope.data.nisn
//             }
//         })
//     }

//     if(param == "nama") {
//         $getNISN = $http.get("http://ibacor/api/data-sisa", {
//             params : {
//                 'nama' : $scope.data.nama,
//                 'tempat' : $scope.data.tempat,
//                 'lahir' : $scope.data.lahir
//             }
//         })
//     }

//     return $getNISN;
// })


app.service('saveNisn', function(){
    var result;

    this.byNisn = function(data){
        result = data;
        // console.log(result);
        // return data;
    }

    this.out = function(){
        console.log(result);
        return result;
    }

});

app.controller('MainCtrl', function($scope,$http, $ionicModal, $ionicPopup, $ionicLoading, $rootScope, saveNisn){

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

    $scope.popupNIS = function(){
        $scope.ctrl = this;
        $scope.opt = 'closed';
        // $scope.nisn = '9996032640';
        // $scope.nisn = '9971027894';

        $scope.nisn = {nisn : ''};

        var popupNIS = $ionicPopup.show({
            template: '<div>Masukan NISN <font color="red">*</font> <br><input type="text" ng-model="nisn.nisn"/></div>',
                title: '',
                scope: $scope,
                buttons: [
                  {
                    text: '<b>Batal</b>',
                    type: 'button-light'
                  },
                  {
                    text: '<b>Ok</b>',
                    type: 'button-assertive',
                    onTap: function(e) {
                        e.preventDefault();

                        $ionicLoading.show({
                            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
                        }).then(function(){
                            console.log($scope.nisn.nisn);
                            popupNIS.close()
                            $http.get("http://ibacor.com/api/data-siswa",{
                                params : {
                                    'nisn' : $scope.nisn.nisn
                                }
                            }).success(function(data){
                                $ionicLoading.hide();
                                // saveNisn.byNisn(data);
                                $rootScope.result = data;

                                window.location = "#/app/outputNISN";
                            }).error(function(data){
                                console.log(data);
                            });
                        });
                    }
                  }
                ]
        });
    };

    $scope.popupNama = function(){
        $scope.ctrl = this;
        $scope.opt = 'closed';

        $scope.byId = {
            nama : '',
            tempat_lahir : '',
            tanggal_lahir : ''
        };


        var popupNama = $ionicPopup.show({
                template: ' <b>Nama <font color="red">*</font><b> <br><input type="text" ng-model="byId.nama"/><br><b>Tempat Lahir <font color="red">*</font></b><br><input type="text" ng-model="byId.tempat_lahir"/><br><b>Tanggal Lahir <font color="red">*</font></b><br><input type="date" ng-model="byId.tanggal_lahir"/>',
                title: '',
                scope: $scope,
                buttons: [
                  {
                    text: '<b>Batal</b>',
                    type: 'button-light'
                  },
                  {
                    text: '<b>Ok</b>',
                    type: 'button-assertive',
                    onTap: function(e) {
                        e.preventDefault();
                        // console.log($scope.tgl_lahir);
                        var tgl = document.getElementsByName('tgl_lahir')[0].defaultValue;
                        // $scope.byId.tanggal_lahir = tgl;
                        console.log(tgl);
                        $ionicLoading.show({
                            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
                        }).then(function(){
                            // console.log($scope.byId);
                            popupNama.close()
                            $http.get("http://ibacor.com/api/data-siswa",{
                                params : {
                                    nama : $scope.byId.nama,
                                    tempat : $scope.byId.tempat_lahir,
                                    lahir : tgl
                                }
                            }).success(function(data){
                                $ionicLoading.hide();
                                // saveNisn.byNisn(data);
                                $rootScope.result = data;

                                window.location = "#/app/outputNISN";
                            }).error(function(data){
                                console.log(tgl);
                                console.log($scope.byId);
                                console.log(data);
                            });
                        });
                    }
                  }
                ]
        });

    };

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


app.controller('OutputCtrl', function($scope, $rootScope, saveNisn){
    $scope.result = $rootScope.result;
    console.log($scope.result);
});