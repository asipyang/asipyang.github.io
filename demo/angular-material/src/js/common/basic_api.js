angular.module("asip.demo").factory('BasicApi', function($http, $q, Config) {
	'use strict';

	var SERVER_URL = Config.getApiServerUrl() + Config.get("API_PREFIX");

	var __doDelete = function(_uri, _callbacks) {
		var url = SERVER_URL + _uri;
		var defer = $q.defer();
		$http.delete(url)
			.success(__generateSuccessCallback(defer, _callbacks))
			.error(__generateErrorCallback(defer, _callbacks));

		return defer.promise;
	};
	var __doGet = function(_uri, _params, _callbacks) {
		var url = SERVER_URL + _uri;
		var defer = $q.defer();
		$http.get(url, {
				params: _params
			})
			.success(__generateSuccessCallback(defer, _callbacks))
			.error(__generateErrorCallback(defer, _callbacks));

		return defer.promise;
	};
	var __doPost = function(_uri, _data, _callbacks) {
		var url = SERVER_URL + _uri;
		var defer = $q.defer();
		$http.post(url, _data)
			.success(__generateSuccessCallback(defer, _callbacks))
			.error(__generateErrorCallback(defer, _callbacks));

		return defer.promise;
	};

	var __generateSuccessCallback = function(_defer, _callbacks) {
		_callbacks = _callbacks || {};
		return function(_returnData, _status, _headers, _config) {
			if (_callbacks.processData && _callbacks.processData.success && angular.isFunction(_callbacks.processData.success)) {
				_callbacks.processData.success(_returnData, _status, _headers, _config);
			}

			if (_callbacks.updateUI && _callbacks.updateUI.success && angular.isFunction(_callbacks.updateUI.success)) {
				_callbacks.updateUI.success(_returnData, _status, _headers, _config);
			}
			_defer.resolve(_returnData);
		};
	};

	var __generateErrorCallback = function(_defer, _callbacks) {
		_callbacks = _callbacks || {};
		return function(_returnData, _status, _headers, _config) {
			if (_callbacks.processData && _callbacks.processData.error && angular.isFunction(_callbacks.processData.error)) {
				_callbacks.processData.error(_returnData, _status, _headers, _config);
			}

			if (_callbacks.updateUI && _callbacks.updateUI.error && angular.isFunction(_callbacks.updateUI.error)) {
				_callbacks.updateUI.error(_returnData, _status, _headers, _config);
			}
			_defer.reject(_returnData);
		};
	};
	return {
		doDelete: __doDelete,
		doGet: __doGet,
		doPost: __doPost
	};
});