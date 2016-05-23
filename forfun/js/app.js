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

	var count = 120;
	var maxX = document.getElementById("main-container").offsetWidth;
	var maxY = document.getElementById("main-container").offsetHeight;
	var timer = new app.store.Timer(count, dispatcher, app.controller.getTimerListeners(), ActionType);

	var intervalId = setInterval(function(){
		if(count === 0){
			clearInterval(intervalId);
			app.actionCreator.displayAllImgWrapper(true);

			setInterval(function(){
				app.actionCreator.autoMove();
			},10);
			return;
		}

		if(count % 10 === 0){
			app.actionCreator.addImgWrapper({
				initX: Math.floor((Math.random() * maxX)),
				initY: Math.floor((Math.random() * maxY)),
			});
		}
		count --;
		app.actionCreator.updateTimer(count);
	}, 1000);

	// preload the images
	var i, img, imgNum = 12;
	for(i=1; i <= imgNum; i++){
		img = new Image();
		img.src = "img/"+i+".png";
	}
};
