angular.module("asip.demo").factory('ProductRepo', function(BasicApi) {
	'use strict';

	var __getProducts = function(_callbacks) {
		var uri = "/products";
		return BasicApi.doGet(uri, {}, _callbacks);
	};


	return {
		getProducts: __getProducts
	};
});