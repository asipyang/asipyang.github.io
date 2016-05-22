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

	var checkOverlap = function(){
		var list = getImgWrappers();

		var hasChange1 = checkOverlapX(list);
		var hasChange2 = checkOverlapY(list);

		if(hasChange1 || hasChange2){
			checkOverlap();
		}
	};
	var checkOverlapX = function(orderedList){
		var i, thisOne, lastOne, oResult, hasChange=false;

		orderedList.sort(function(a,b){
			return a.x0 > b.x0;
		});

		if(orderedList.length > 1){
			thisOne = orderedList[0];
			oResult = isOverlap(thisOne, orderedList[1]);
			if(oResult){
				thisOne.setXY(thisOne.x0-(thisOne.x1-orderedList[1].x0+1), thisOne.y0);
				hasChange = true;
			}
		}
		for(i=1; i < orderedList.length; i++){
			thisOne = orderedList[i];
			lastOne = orderedList[i-1];

			oResult = isOverlap(lastOne, thisOne);
			if(oResult){
				console.log(lastOne._uid +" "+oResult+" "+thisOne._uid);
				thisOne.setXY(lastOne.x1+1, thisOne.y0);
				hasChange = true;
			}
		}

		return hasChange;
	};

	var checkOverlapY = function(orderedList){
		var i, thisOne, lastOne, oResult, hasChange=false;

		orderedList.sort(function(a,b){
			return a.y0 > b.y0;
		});

		if(orderedList.length > 1){
			thisOne = orderedList[0];
			oResult = isOverlap(thisOne, orderedList[1]);
			if(oResult){
				thisOne.setXY(thisOne.x0, thisOne.y0-(thisOne.y1-orderedList[1].y0+1));
				hasChange = true;
			}
		}
		for(i=1; i < orderedList.length; i++){
			thisOne = orderedList[i];
			lastOne = orderedList[i-1];

			oResult = isOverlap(lastOne, thisOne);
			if(oResult){
				console.log(lastOne._uid +" "+oResult+" "+thisOne._uid);
				thisOne.setXY(thisOne.x0, lastOne.y1+1);
				hasChange = true;
			}
		}

		return hasChange;
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
		imgWrapper.setWidthHeight(data.width, data.height);

		checkOverlap();

		console.log(imgWrapper);
		triggerListeners();
	};

	dispatcher.setCallback(addImgWrapperHandler);
	dispatcher.setCallback(updateImgWrapperHandler);

	self.getImgWrappers = getImgWrappers;
};

app.store.ImgWrapper = function(initX, initY){
	"use strict";
	var self = this;

	self.x0 = initX < 0? 0 : initX;
	self.y0 = initY < 0? 0 : initY;
};
app.store.ImgWrapper.prototype.setWidthHeight = function(width, height){
	"use strict";
	var self = this;

	self.width = width;
	self.height = height;
	self.x1 = self.x0 + width;
	self.y1 = self.y0 + height;
};
app.store.ImgWrapper.prototype.setXY = function(x0, y0){
	"use strict";
	var self = this;

	self.x0 = x0 < 0? 0 : x0;
	self.y0 = y0 < 0? 0 : y0;
	self.x1 = self.x0 + self.width;
	self.y1 = self.y0 + self.height;
};