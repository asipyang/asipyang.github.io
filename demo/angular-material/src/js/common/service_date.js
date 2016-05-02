angular.module("asip.demo").factory('DateServ', function() {
	'use strict';

	var __addDay = function(_date, _day){
		var result = new Date(_date);
		result.setDate(result.getDate() + _day);

		return result;
	};

	var __roundToDay = function(_date){
		var result = new Date(_date);

		result.setHours(0);
		result.setMinutes(0);
		result.setSeconds(0);
		result.setMilliseconds(0);

		return result;
	};

	return {
		addDay: __addDay,
		roundToDay: __roundToDay
	};
});