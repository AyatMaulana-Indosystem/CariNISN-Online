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
        $scope.byId = {
            nama : '',
            tempat_lahir : '',
            tanggal_lahir : ''
        };


        var popupNIS = $ionicPopup.show({
            template: '<div>Masukan NISN <font color="red">*</font> <br><input type="text" ng-model="nisn.nisn"/></div>',
                title: 'Masukan data pada kolom dibawah ini',
                scope: $scope,
                buttons: [
                  {
                    text: '<b>Cancel</b>',
                    type: 'button-light'
                  },
                  {
                    text: '<b>Save</b>',
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
    }

    $scope.popupNama = function(){
        $scope.opt = 'closed';

        var popupNama = $ionicPopup.show({
            template: '{{ byId }} <b>Nama {{ byId }} <font color="red">*</font><b> <br><input type="text" ng-model="byId.nama"/><br><b>Tempat Lahir <font color="red">*</font></b><br><input type="text" ng-model="byId.tempat_lahir"/><br><b>Tanggal Lahir <font color="red">*</font></b><br><input type="date" ng-model="byId.tanggal_lahir"/>',
                title: 'Masukan data pada kolom dibawah ini',
                scope: $scope,
                buttons: [
                    {
                    text: '<b>Cancel</b>',
                    type: 'button-light'
                  },
                  {
                    text: '<b>Save</b>',
                    type: 'button-assertive',
                    onTap: function(e) {
                        e.preventDefault();

                        console.log($scope.byId.nama)

                        // console.log($scope.byId);
                        // $http.get('http://ibacor.com/api/data-siswa',{
                        //     params : $scope.byId
                        // }).success(function(data){
                        //     console.log(data);
                        // });

                    }
                  }
                ]
        });

         popupNama.then(function(res) {
            console.log('Tapped!', res);
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