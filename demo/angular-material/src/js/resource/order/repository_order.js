angular.module("asip.demo").factory('OrderRepo', function(BasicApi) {
	'use strict';

	var __getOrders = function(_callbacks) {
		var uri = "/orders";
		return BasicApi.doGet(uri, {}, _callbacks);
	};


	return {
		getOrders: __getOrders
	};
});