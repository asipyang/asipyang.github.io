angular.module('asip.demo').controller('OrdersCtrl', function(
	$scope,
	OrderServ,
	DateServ) {
	"use strict";

	var orders;

	var __initScope = function() {
		$scope.orders = orders;
		$scope.selectedOrder = -1;

		$scope.toggleOrder = __toggleOrder;
	};

	var __transformOrders = function(_orders){
		var orderMap = {}, displayOrders = [];
		var i, order, dateTime, keys;

		for(i=0; i < _orders.length; i++){
			order = _orders[i];
			dateTime = DateServ.roundToDay(order.createTime);
			orderMap[dateTime] = orderMap[dateTime] || [];
			orderMap[dateTime].push(order);
		}

		keys = Object.keys(orderMap);
		for(i=0; i < keys.length; i++){
			displayOrders.push({
				date: new Date(keys[i]),
				orders: orderMap[ keys[i] ]
			});
		}
		return displayOrders;
	};

	var __toggleOrder = function(_id){
		if($scope.selectedOrder === _id){
			$scope.selectedOrder = -1;
		}
		else{
			$scope.selectedOrder = _id;
		}
	};


	OrderServ.getOrders().then(function(_orders){
		orders = __transformOrders(_orders);
		__initScope();
	});
});