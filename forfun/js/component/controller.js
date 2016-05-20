app.controller = (function(){
	"use strict";
	var actionCreator = app.actionCreator;
	var imgWrapperMap = {};

	var getListeners = function(){
		return [displayImgWrappers];
	};

	var getMainListeners = function(){
		return [displayMainContainer];
	};

	var displayMainContainer = function(mainContainer){
		var body = document.getElementsByTagName("body")[0];
		var container = document.createElement("div");
		container.setAttribute("id","main-container");
		container.onclick = actionCreator.addImgWrapper;

		body.appendChild(container);
	};

	var displayImgWrappers = function(mainContainer){
		var i;
		var models = mainContainer.imgWrappers;

		for(i=0; i < models.length; i++){
			if(imgWrapperMap[models[i]._uid]){
				updateImgWrapper( models[i] );
			}else{
				insertImgWrapper( models[i] );
			}
			imgWrapperMap[models[i]._uid] = models[i];
		}
	};

	var insertImgWrapper = function(model){
		var container = document.getElementById("main-container");
		var imgW = document.createElement("div");

		imgW.className += "img-wrapper";
		imgW.style.transform = "translate("+model.x0+"px,"+model.y0+"px)";
		container.appendChild(imgW);
	};

	var updateImgWrapper = function(model){

	};

	return {
		getListeners: getListeners,
		getMainListeners: getMainListeners
	};
})();