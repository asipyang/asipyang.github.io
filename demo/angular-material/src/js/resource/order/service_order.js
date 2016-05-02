angular.module("asip.demo").factory('OrderServ', function(OrderRepo) {
	'use strict';

	var orders = [];

	var __getOrders = function(_updateUI) {
		var processData = {
			success: function(_returnData){
				var i;
				orders.splice(0, orders.length);
				for(i=0; i < _returnData.length; i++){
					orders.push(_returnData[i]);
				}
			}
		};
		var callbacks = {};

		callbacks.updateUI = _updateUI;
		callbacks.processData = processData;

		return OrderRepo.getOrders(callbacks).then(function(){
			return orders;
		});
	};


	return {
		getOrders: __getOrders
	};
});