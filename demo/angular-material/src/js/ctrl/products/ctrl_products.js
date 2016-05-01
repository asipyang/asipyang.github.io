angular.module('asip.demo').controller('ProductsCtrl', function(
	$scope,
	$rootScope,
	RightDialogServ) {
	"use strict";

	var __initScope = function(){
		$scope.openDialog = __openDialog;
	};

	var __openDialog = function(){
		RightDialogServ.openDialog("Edit");
	};
	__initScope();

});