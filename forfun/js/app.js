var app = app || {};
app.init = function(){
	"use strict";

	var dispatcher = app.dispatcher;
	var listeners = app.controller.getListeners();
	var ActionType = app.act.ActionType;

	var container = new app.store.MainContainer(dispatcher, listeners, ActionType);
	app.controller.getMainListeners().forEach(function(listener){
		listener(container);
	});

	var count = 12;
	var maxX = document.getElementById("main-container").offsetWidth;
	var maxY = document.getElementById("main-container").offsetHeight;
	var intervalId = setInterval(function(){

		if(count === 0){
			clearInterval(intervalId);
			app.actionCreator.displayAllImgWrapper(true);
			console.log("stop");
			return;
		}

		app.actionCreator.addImgWrapper({
			initX: Math.floor((Math.random() * maxX)),
			initY: Math.floor((Math.random() * maxY)),
		});
		count --;
	}, 500);
};
