<<<<<<< Updated upstream
app.controller('MainCtrl', function($scope){
	// 
=======
app.controller('MainCtrl', function($scope, $ionicModal){
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

	$scope.showModalNISN = function(){
		console.log(324234231);
		$scope.opt = 'closed';
		$scope.modalNISN.show();		
	};


	$scope.showModalNama = function(){
		console.log(32432);
		$scope.opt = 'closed';
		$scope.modalNama.show();
	}


>>>>>>> Stashed changes
});