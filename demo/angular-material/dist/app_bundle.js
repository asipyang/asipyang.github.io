var app = angular.module('asip.demo', [
	'ngRoute',
	'ngMessages',
	'ngMaterial',
	'ngAnimate'
	// 'highcharts-ng'
]);

app.config(function($routeProvider, $mdThemingProvider, $provide) {
	'use strict';
	$routeProvider
		.when('/dashboard', {
			templateUrl: 'template/_dashboard.html',
			// controller: 'CodeGenController'
		})
		.when('/products', {
			templateUrl: 'template/_products.html',
			controller: 'ProductsCtrl'
		})
		.otherwise({
			redirectTo: '/dashboard'
		});

	// defind the theme of the Angular Material
	$mdThemingProvider.theme('default')
		.primaryPalette('light-green', {
			'default': '500',
			'hue-1': '200',
			'hue-2': '400',
			'hue-3': '300'
		})
		.accentPalette('orange', {
			'default': '600',
			'hue-1': '200',
			'hue-2': '100',
			'hue-3': '400'
		})
		.warnPalette('red');

	$mdThemingProvider.theme('side-menu')
		.primaryPalette('light-green', {
			'default': '700',
			'hue-1': '200',
			'hue-2': '400',
			'hue-3': '500'
		})
		.accentPalette('orange', {
			'default': '600'
		})
		.warnPalette('red')
		.backgroundPalette('light-green', {
			'default': '300'
		});

	$provide.decorator("BasicApi", function($delegate){
		var origGet = $delegate.doGet;
		$delegate.doGet = function(_uri, _params, _callbacks) {
			return origGet(_uri+".json", _params, _callbacks);
		};

		return $delegate;
	});
});
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
angular.module("asip.demo").factory('RightDialogServ', function($rootScope) {
	'use strict';

	var __openDialog = function(_title, _tmplUrl, _data){
		$rootScope.$emit("openDialog", {
			title: _title,
			tmplUrl: _tmplUrl,
			data: _data
		});
	};

	var __closeDialog = function(){
		$rootScope.$emit("closeDialog");
	};

	return {
		openDialog: __openDialog,
		closeDialog: __closeDialog
	};
});
angular.module('asip.demo').controller('ProductDlgCtrl', function(
	$scope,
	RightDialogServ,
	ProductServ) {
	"use strict";

	var __initScope = function(){
		$scope.$watch('dialog.data', function(_new, _old){
			$scope.data = angular.copy(_new);
		}, true);

		$scope.confirmHandler = __confirmHandler;
		$scope.cancelHandler = __cancelHandler;
	};

	var __confirmHandler = function(){
		if($scope.productForm.$valid){
			if($scope.data.id){
				ProductServ.updateProduct($scope.data);
			}else{
				ProductServ.addProduct($scope.data);
			}

			RightDialogServ.closeDialog();
		}
	};

	var __cancelHandler = function(){
		RightDialogServ.closeDialog();
	};

	__initScope();
});
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
angular.module('asip.demo').controller('FrameCtrl', function(
	$scope,
	$rootScope,
	$location,
	$mdSidenav) {
	"use strict";

	var menu = [
		// {name: "Cat1", icon: "text_fields", subMenu: [{name: "Item1", link:""},{name: "Item2", link:""}]},
		{name: "Dashboard", icon: "show_chart", link: "/dashboard"},
		{name: "Products", icon: "card_giftcard", link: "/products"},
		{name: "Orders", icon: "content_paste", link: ""}
	];

	var __initScope = function(){
		$scope.menu = menu;
		$scope.menuSelected = __getSelectedMenu();
		$scope.title = __getTitle($scope.menuSelected);
		$scope.dialog = {
			open: false,
			title: "",
			tmpUrl: "",
			data: {}
		};

		$scope.toggleSideNav = function() {
			$mdSidenav('side-menu').toggle();
		};
		$scope.navigateTo = function(link, $index, $event) {
			$location.path(link);

			$scope.menuSelected = $index;
			$scope.title = __getTitle($scope.menuSelected);

			//$scope.dlgOpen = false;
			$mdSidenav('side-menu').close();
		};

		$scope.closeDialog = function(){
			$scope.dialog.open = false;
		};
		$rootScope.$on('openDialog', function(event, args) {
			$scope.dialog.open = true;
			$scope.dialog.title = args.title;
			$scope.dialog.tmpUrl = args.tmplUrl;
			$scope.dialog.data = args.data;
			// if ($scope.dlgOpen) {
			// 	$scope.$broadcast('refreshDialog', {
			// 		data: args.data,
			// 	});
			// } else {
			// 	$scope.dlgOpen = true;
			// 	$scope.dlgData = args.data;
			// 	$scope.dlgUrl = args.url;
			// }
			// $scope.dlgTitle = args.title;
		});
		$rootScope.$on('closeDialog', function(event, args) {
			$scope.closeDialog();
			// if (args.refresh) {
			// 	$scope.$broadcast('refreshView', {});
			// }
		});
	};

	var __getSelectedMenu = function(){
		var i;
		var currentPath = $location.path();

		for(i=0; i<menu.length; i++){
			if(currentPath === menu[i].link){
				return i;
			}
		}
		return -1;
	};

	var __getTitle = function(index){
		return index > -1 && index < menu.length? menu[index].name: "";
	};

	__initScope();
});
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
		for(i=0; i < products.length && _product.id === products[i].id; i++){
			products.splice(i,1);
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