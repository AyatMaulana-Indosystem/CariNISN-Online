app.controller('MainCtrl', function($scope, $ionicModal){
	console.log(2);
	$ionicModal
	.fromTemplateUrl('modalNama.html',{
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal){
		$scope.modalNama = modal;
	});

	$scope.test = "hallo";

	$ionicModal
	.fromTemplateUrl('modalNISN.html',{
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal){
		$scope.modalNISN = modal;
	// });

	$scope.nacak = function(){
		console.log('hallo');
	}

	$scope.showModalNISN = function(){
		console.log(1);
		$scope.modalNISN.show();		
	};


	$scope.showModalNama = function(){
		console.log(1);
		$scope.opt = 'closed';
		$scope.modalNama.show();
	}


});