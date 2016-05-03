var app = angular.module('asip.demo', [
	'ngRoute',
	'ngMessages',
	'ngMaterial',
	'ngAnimate',
	'highcharts-ng'
]);

app.config(function($routeProvider, $mdThemingProvider, $provide, highchartsNGProvider) {
	'use strict';
	$routeProvider
		.when('/user-info', {
			templateUrl: 'template/user_info.html'
		})
		.when('/products', {
			templateUrl: 'template/products.html',
			controller: 'ProductsCtrl'
		})
		.when('/orders', {
			templateUrl: 'template/orders.html',
			controller: 'OrdersCtrl'
		})
		.when('/dashboard', {
			templateUrl: 'template/dashboard.html',
			controller: 'DashboardCtrl'
		})
		.otherwise({
			redirectTo: '/user-info'
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

	// append '.json' to every rest api for getting the demo data
	$provide.decorator("BasicApi", function($delegate){
		var origGet = $delegate.doGet;
		$delegate.doGet = function(_uri, _params, _callbacks) {
			return origGet(_uri+".json", _params, _callbacks);
		};

		return $delegate;
	});

	highchartsNGProvider.lazyLoad();
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
angular.module('asip.demo').controller('DashboardCtrl', function(
	$scope,
	highchartsNG) {
	"use strict";

	var p1Data = [[1451577600000,1235],[1451664000000,1330],[1451750400000,1523],[1451836800000,1766],[1451923200000,2134],[1452009600000,2889],[1452096000000,2123],[1452182400000,2234],[1452268800000,2756],[1452355200000,2913],[1452441600000,3021],[1452528000000,2656],[1452614400000,2524],[1452700800000,2464],[1452787200000,2693],[1452873600000,2312],[1452960000000,2294]];
	var p2Data = [[1451664000000,1911],[1451750400000,1753],[1451836800000,1651],[1451923200000,1663],[1452009600000,1813],[1452096000000,1766],[1452182400000,2127],[1452268800000,2410],[1452355200000,2059],[1452441600000,1713],[1452528000000,1598]];
	var p3Data = [[1451664000000,1201],[1451750400000,1251],[1451836800000,1413],[1451923200000,1644],[1452009600000,1612],[1452096000000,2552],[1452182400000,2625],[1452268800000,2523],[1452355200000,2421],[1452441600000,2743],[1452528000000,2623],[1452614400000,2611],[1452700800000,2816],[1452787200000,2631],[1452873600000,2778],[1452960000000,2685]];

	var chartConfig = {
			options: {
		      	chart: {
		          type: 'line',
		          zoomType: 'x',
		          backgroundColor: '#8BC34A'
		      	},
		      	legend: {
		      		enabled: true
		      	},
		      	xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
		                day: '%m/%e'
		            },
		            title: {
		                text: "Date",
		                align: 'high'
		            }
				},
				yAxis: {
					title: {text: ""}
				}
		  	},
		  	title: {text: ""},
		  	xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {day: '%m/%e'}
			},
		  	series: [
		  		{ name: 'Product1', data: p1Data, color: "#FF8F00" },
		  		{ name: 'Product2', data: p2Data, color: "#FFB300" },
		  		{ name: 'Product3', data: p3Data, color: "#FFD54F" }
		  	]
		};

	var __initScope = function(){
		$scope.chartConfig = chartConfig;
	};


	highchartsNG.ready(function(){
		Highcharts.setOptions({
			global: {
				useUTC: false
			}
		});
	},this);
	__initScope();
});
angular.module('asip.demo').controller('FrameCtrl', function(
	$scope,
	$rootScope,
	$location,
	$mdSidenav) {
	"use strict";

	var menu = [
		{name: "Products", icon: "card_giftcard", link: "/products"},
		{name: "Orders", icon: "content_paste", link: "/orders"},
		{name: "Dashboard", icon: "show_chart", link: "/dashboard"}
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

			$scope.closeDialog();
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
		});
		$rootScope.$on('closeDialog', function(event, args) {
			$scope.closeDialog();
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
angular.module('asip.demo').controller('ProductDlgCtrl', function(
	$scope,
	RightDialogServ,
	ProductServ) {
	"use strict";

	var __initScope = function(){
		$scope.$watch('dialog.data', function(_new, _old){
			__resetState();
			$scope.data = angular.copy(_new);
		}, true);

		$scope.confirmHandler = __confirmHandler;
		$scope.cancelHandler = __cancelHandler;
		$scope.deleteHandler =__deleteHandler;
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

	var __deleteHandler = function(){
		ProductServ.deleteProduct($scope.data);
		RightDialogServ.closeDialog();
	};

	var __resetState = function(){
		$scope.productForm.$setPristine();
		$scope.deleteForSure = false;
	};

	__initScope();
});
angular.module('asip.demo').controller('ProductsCtrl', function(
	$scope,
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

		RightDialogServ.openDialog(_title, "template/product_dlg.html", _data);
	};

	ProductServ.getProducts().then(function(_products){
		products = _products;
		__initScope();
	});
});
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