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

	var displayImgWrappers = function(models){
		var i;

		for(i=0; i < models.length; i++){
			if(imgWrapperMap[models[i]._uid]){
				updateImgWrapper( models[i] );
			}else{
				insertImgWrapper( models[i] );
			}
		}
	};

	var insertImgWrapper = function(model){
		var container = document.getElementById("main-container");
		var imgW = document.createElement("div");

		imgW.className += "img-wrapper";
		imgW.style.transform = "translate("+model.x0+"px,"+model.y0+"px)";
		container.appendChild(imgW);

		imgWrapperMap[model._uid] = imgW;

		actionCreator.updateImgWrapper({
			width: imgW.offsetWidth,
			height: imgW.offsetHeight
		});
	};

	var updateImgWrapper = function(model){
		var imgW = imgWrapperMap[ model._uid ];
		imgW.style.transform = "translate("+model.x0+"px,"+model.y0+"px)";
	};

	return {
		getListeners: getListeners,
		getMainListeners: getMainListeners
	};
})();