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

		displayAll(false);
		triggerListeners();
	};

	var checkOverlap = function(thisOne){
		var queue = [thisOne];
		var list = getImgWrappers();
		var i, j, otherOne, oResult;

		for(j=0; j < queue.length; j++){
			thisOne = queue[j];

			for(i=0; i < list.length; i++){
				otherOne = list[i];
				oResult = isOverlap(thisOne, otherOne);
				if(thisOne._uid !== otherOne._uid && oResult){
					if(oResult === "lt"){
						otherOne.setXY(otherOne.x0 - (otherOne.x1 - thisOne.x0) -1, otherOne.y0);
						if(otherOne.x0 === 0 && isOverlap(thisOne, otherOne)){
							otherOne.setXY(otherOne.x0, otherOne.y0 - (otherOne.y1 - thisOne.y0) -1);
						}
					} else if(oResult === "rt"){
						otherOne.setXY(otherOne.x0 + (thisOne.x1 - otherOne.x0) +1, otherOne.y0);
						if(otherOne.x0 === otherOne.maxX && isOverlap(thisOne, otherOne)){
							otherOne.setXY(otherOne.x0, otherOne.y0 - (otherOne.y1 - thisOne.y0) -1);
						}
					} else if(oResult === "lb"){
						otherOne.setXY(otherOne.x0 - (otherOne.x1 - thisOne.x0) -1, otherOne.y0);
						if(otherOne.x0 === 0 && isOverlap(thisOne, otherOne)){
							otherOne.setXY(otherOne.x0, otherOne.y0 + (thisOne.y1 - otherOne.y0) +1);
						}
					} else if(oResult === "rb"){
						otherOne.setXY(otherOne.x0 + (thisOne.x1 - otherOne.x0) +1, otherOne.y0);
						if(otherOne.x0 === otherOne.maxX && isOverlap(thisOne, otherOne)){
							otherOne.setXY(otherOne.x0, otherOne.y0 + (thisOne.y1 - otherOne.y0) +1);
						}
					}
					queue.push(otherOne);
				}
			}
		}
	};

	var isOverlap = function(a, b){
		if((a.x0 >= b.x0 && a.x0 <= b.x1) && (a.y0 >= b.y0 && a.y0 <= b.y1)){return "lt";} // a overlaps b on its left-top
		else if((a.x1 >= b.x0 && a.x1 <= b.x1) && (a.y0 >= b.y0 && a.y0 <= b.y1)){return "rt";} // a overlaps b on its right-top
		else if((a.x0 >= b.x0 && a.x0 <= b.x1) && (a.y1 >= b.y0 && a.y1 <= b.y1)){return "lb";} // a overlaps b on its left-bottom
		else if((a.x1 >= b.x0 && a.x1 <= b.x1) && (a.y1 >= b.y0 && a.y1 <= b.y1)){return "rb";}	// a overlaps b on its right-bottom
		else if((a.x0 <= b.x0 && a.x1 >= b.x1) && (a.y0 >= b.y0 && a.y1 <= b.y1)){return "tv";} // a through b vertically
		else if((a.x0 >= b.x0 && a.x1 <= b.x1) && (a.y0 <= b.y0 && a.y1 >= b.y1)){return "th";} // a through b horizontally
	};

	var createImgWrapper = function(initX, initY){
		var newStore = new app.store.ImgWrapper(initX, initY);
		newStore._uid = ++uid;

		console.log(newStore);

		return newStore;
	};

	var displayAll = function(show){
		var list = getImgWrappers();
		var i;

		for(i=0; i < list.length; i++){
			list[i].show = show;
		}
	};

	var displayAllImgWrapperHandler = function(action){
		if(action.type !== ActionType.DISPLAY_ALL_IMG_WRAPPER){return;}
		displayAll(action.data);

		triggerListeners();
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

	var updateImgWrapperHandler = function(action){
		var data = action.data;
		var imgWrapper;

		if(action.type !== ActionType.UPDATE_IMG_WRAPPER){return;}

		imgWrapper = imgWrapperMap[data._uid];
		imgWrapper.setWidthHeight(data.width, data.height, self.width, self.height);

		checkOverlap(imgWrapper);

		console.log(imgWrapper);
		imgWrapper.show = true;
		triggerListeners();
	};

	var updateMainContainerHandler = function(action){
		var data = action.data;

		if(action.type !== ActionType.UPDATE_MAIN_CONTAINER){return;}

		self.width = data.width;
		self.height = data.height;
	};

	dispatcher.setCallback(addImgWrapperHandler);
	dispatcher.setCallback(updateImgWrapperHandler);
	dispatcher.setCallback(updateMainContainerHandler);
	dispatcher.setCallback(displayAllImgWrapperHandler);

	self.width = 0;
	self.height = 0;
	self.getImgWrappers = getImgWrappers;
};

app.store.ImgWrapper = function(initX, initY){
	"use strict";
	var self = this;

	self.x0 = initX < 0? 0 : initX;
	self.y0 = initY < 0? 0 : initY;
	self.show = false;
};
app.store.ImgWrapper.prototype.setWidthHeight = function(width, height, maxX, maxY){
	"use strict";
	var self = this;

	self.width = width;
	self.height = height;
	self.maxX = maxX;
	self.maxY = maxY;
	self.x1 = self.x0 + width;
	self.y1 = self.y0 + height;

	self.validateXY();
};
app.store.ImgWrapper.prototype.setXY = function(x0, y0){
	"use strict";
	var self = this;

	self.x0 = x0 < 0? 0 : x0;
	self.y0 = y0 < 0? 0 : y0;
	self.x1 = self.x0 + self.width;
	self.y1 = self.y0 + self.height;

	self.validateXY();
};
app.store.ImgWrapper.prototype.validateXY = function(){
	"use strict";
	var self = this;

	if(self.x1 > self.maxX){
		self.x1 = self.maxX;
		self.x0 = self.x1 - self.width;
	}
	if(self.y1 > self.maxY){
		self.y1 = self.maxY;
		self.y0 = self.y1 - self.height;
	}
};