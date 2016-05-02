angular.module('asip.demo').controller('ProductDlgCtrl', function(
	$scope,
	RightDialogServ,
	ProductServ) {
	"use strict";

	var __initScope = function(){
		$scope.$watch('dialog.data', function(_new, _old){
			__resetState();
			$scope.data = angular.copy(_new);
		}, true);

		$scope.confirmHandler = __confirmHandler;
		$scope.cancelHandler = __cancelHandler;
		$scope.deleteHandler =__deleteHandler;
	};

	var __confirmHandler = function(){
		if($scope.productForm.$valid){
			if($scope.data.id){
				ProductServ.updateProduct($scope.data);
			}else{
				ProductServ.addProduct($scope.data);
			}

			RightDialogServ.closeDialog();
		}
	};

	var __cancelHandler = function(){
		RightDialogServ.closeDialog();
	};

	var __deleteHandler = function(){
		ProductServ.deleteProduct($scope.data);
		RightDialogServ.closeDialog();
	};

	var __resetState = function(){
		$scope.productForm.$setPristine();
		$scope.deleteForSure = false;
	};

	__initScope();
});