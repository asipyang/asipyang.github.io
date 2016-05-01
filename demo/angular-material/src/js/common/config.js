angular.module("asip.demo").factory('Config', function($window) {
	'use strict';

	var config = {
		API_SERVER_URL: "./",
		API_PREFIX: "/demo_json",
		DOMAIN: $window.location.protocol + "//" + $window.location.host
	};

	var __get = function(param) {
		return config[param];
	};
	var __getInteger = function(param) {
		return parseInt(config[param]);
	};
	var __getApiServerUrl = function() {
		var url;

		if (config.API_SERVER_URL && config.API_SERVER_URL !== "") {
			url = config.API_SERVER_URL;
		} else {
			url = config.DOMAIN;
		}
		return url;
	};

	return {
		get: __get,
		getInteger: __getInteger,
		getApiServerUrl: __getApiServerUrl
	};
});