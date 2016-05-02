angular.module("asip.demo").factory('ProductServ', function(ProductRepo) {
	'use strict';

	var products = [];

	var __addProduct = function(_product) {
		// not adding for real
		_product.id = "pid"+ (products.length +1);
		products.push(_product);
	};

	var __deleteProduct = function(_product) {
		// not deleting for real
		var i;
		for(i=0; (i < products.length); i++){
			if(_product.id === products[i].id){
				products.splice(i,1);
			}
		}
	};

	var __getProducts = function(_updateUI) {
		var processData = {
			success: function(_returnData){
				var i;
				products.splice(0, products.length);
				for(i=0; i < _returnData.length; i++){
					products.push(_returnData[i]);
				}
			}
		};
		var callbacks = {};

		callbacks.updateUI = _updateUI;
		callbacks.processData = processData;

		return ProductRepo.getProducts(callbacks).then(function(){
			return products;
		});
	};

	var __updateProduct = function(_product) {
		// not updating for real
		var i;
		for(i=0; (i < products.length); i++){
			if(_product.id === products[i].id){
				products.splice(i,1);
				products.splice(i,0,_product);
			}
		}
	};


	return {
		addProduct: __addProduct,
		deleteProduct: __deleteProduct,
		getProducts: __getProducts,
		updateProduct: __updateProduct
	};
});