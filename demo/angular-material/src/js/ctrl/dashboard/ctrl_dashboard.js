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