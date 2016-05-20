app.store = app.store || {};
app.store.MainContainer = function(dispatcher, listeners, ActionType){
	"use strict";
	var self = this;
	var uid = 0;
	var imgWrappers = [];

	var addImgWrapperHandler = function(action){
		var imgWrapper;

		if(action.type !== ActionType.ADD_IMG_WRAPPER){return;}

		imgWrapper = createImgWrapper(action.data.offsetX, action.data.offsetY);
		imgWrappers.push(imgWrapper);

		triggerListeners();
	};

	var createImgWrapper = function(initX, initY){
		var newStore = new app.store.ImgWrapper(initX, initY);
		newStore._uid = ++uid;

		console.log(newStore);

		return newStore;
	};

	var triggerListeners = function(){
		var i;
		for(i=0; i < listeners.length; i++){
			listeners[i](self);
		}
	};

	dispatcher.setCallback(addImgWrapperHandler);

	this.imgWrappers = imgWrappers;
};

app.store.ImgWrapper = function(initX, initY){
	"use strict";

	this.x0 = initX;
	this.y0 = initY;
};