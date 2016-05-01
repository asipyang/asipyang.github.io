angular.module('asip.demo').controller('ProductsCtrl', function(
	$scope,
	$rootScope,
	RightDialogServ,
	ProductServ) {
	"use strict";

	var products;

	var __initScope = function(){
		$scope.products = products;

		$scope.addPorduct = __addPorduct;
		$scope.updateProduct = __updateProduct;
	};

	var __addPorduct = function(){
		__openDialog("Add Product");
	};

	var __updateProduct = function(_data){
		__openDialog("Edit Product", _data);
	};

	var __openDialog = function(_title, _data){
		_data = _data || {};

		RightDialogServ.openDialog(_title, "template/_product_dlg.html", _data);
	};

	ProductServ.getProducts().then(function(_products){
		products = _products;
		__initScope();
	});
});