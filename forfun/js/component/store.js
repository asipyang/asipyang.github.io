app.store = app.store || {};
app.store.MainContainer = function(dispatcher, listeners, ActionType){
	"use strict";
	var self = this;
	var uid = 0;
	var imgWrapperMap = {};

	var addImgWrapperHandler = function(action){
		var imgWrapper;

		if(action.type !== ActionType.ADD_IMG_WRAPPER){return;}

		imgWrapper = createImgWrapper(action.data.initX, action.data.initY);
		imgWrapperMap[imgWrapper._uid] = imgWrapper;

		triggerListeners();
	};

	var createImgWrapper = function(initX, initY){
		var newStore = new app.store.ImgWrapper(initX, initY, dispatcher, listeners, ActionType);
		newStore._uid = ++uid;

		console.log(newStore);

		return newStore;
	};

	var getImgWrappers = function(){
		var list = [];
		var keys = Object.keys(imgWrapperMap);
		var i;

		for(i=0; i < keys.length; i++){
			list.push(imgWrapperMap[ keys[i] ]);
		}

		return list;
	};

	var triggerListeners = function(){
		var i;
		for(i=0; i < listeners.length; i++){
			listeners[i]( getImgWrappers() );
		}
	};

	dispatcher.setCallback(addImgWrapperHandler);

	self.getImgWrappers = getImgWrappers;
};

app.store.ImgWrapper = function(initX, initY, dispatcher, listeners, ActionType){
	"use strict";
	var self = this;

	var triggerListeners = function(){
		var i;
		for(i=0; i < listeners.length; i++){
			listeners[i]( [self] );
		}
	};

	var updateImgWrapperHandler = function(action){
		var data = action.data;

		if(action.type !== ActionType.UPDATE_IMG_WRAPPER){return;}

		self.width = data.width;
		self.height = data.height;
		self.x0 = data.x0;
		self.y0 = data.y0;
		self.x1 = data.x1;
		self.y1 = data.y1;

		triggerListeners();
	};

	self.x0 = initX;
	self.y0 = initY;

	dispatcher.setCallback(updateImgWrapperHandler);
};