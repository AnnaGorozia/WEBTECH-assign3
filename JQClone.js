(function (window, document) {

function first() {
	var result = [];
	if (this.length > 0){	
		result.push(this[0]);
	}
	return factory(result);
}

function last() {
	var result = [];
	if (this.length > 0)
		var len = this.length
		result.push(this[len-1]);
	return factory(result);
}

function each(callback){
    var object = this;
	length = object.length;
	var i = 0;
    for ( ; i < length; ) {
		if (callback.call( object[i], i, object[i++]) === false ) {
			break;
		}
	}
    return factory(object);
}

function find(selector){
	for(var i = 0; i < this.length; i++){
		var local = this[i].querySelectorAll(selector);
		return factory(local);	
	}
}

function hasClass(selector) {
    var reg = /[\n\t\r]/g;
	var className = " " + selector + " ";
	var length = this.length;
	if(length != 0){
		if (this[0].nodeType === 1 && (" " + this[0].className + " ").replace(reg, " ").indexOf(className) > -1 ) {
			return true;
		}
	}

	return false;
}

function addClass(classes){
    var rspace = /\s+/;
    var  setClass;
    var classNames = classes.split( rspace );
    var l = this.length;
	var trimL = /^\s+/;
	var trimR = /\s+$/;
	for ( i = 0, l = this.length; i < l; i++ ) {
		if (this[i].nodeType === 1) {
			if (!this[i].className && classNames.length === 1) {
				this[i].className = classes;
			} else {
				setClass = " " + this[i].className + " ";
                var len = classNames.length;
				for (var j = 0; j < len; j++) {
					if (!~setClass.indexOf( " " + classNames[j] + " " ) ) {
						setClass += classNames[j] + " ";
					}
				}
				setClass.toString().replace( trimL, "" ).replace( trimR, "" );
				this[i].className = setClass;
			}
		}
	}
    return factory(this);
}


function removeClass(classes) {
	var classNames, className;
    var rspace = /\s+/;
	var rclass = /[\n\t\r]/g;
	classNames = (classes || "").split( rspace );
    var l = this.length;
	var trimL = /^\s+/;
	var trimR = /\s+$/;
	for (var i = 0; i < l; i++ ) {
		if ( this[i].nodeType === 1 && this[i].className ) {
		    if (classes) {
				className = (" " + this[i].className + " ").replace( rclass, " " );
                var len = classNames.length
				for (var j= 0; j < len; j++ ) {
					className = className.replace(" " + classNames[j] + " ", " ");
				}
				className.toString().replace( trimL, "" ).replace( trimR, "" );
				this[i].className = className;

			} else {
				this[i].className = "";
			}
		}
	}
	return factory(this);
}

function toggleClass(value, addOrRemove) {
	var rspace = /\s+/;
	var classNames = value.split( rspace );
	var bool;
	var className;
	if(addOrRemove != null){
		bool = addOrRemove;
	}else{
		bool = null;
	}
	for(var i = 0; i < classNames.length; i++){
		className = classNames[i];
		if(bool!=null){
			if(bool){
				if(!this.hasClass(className)){
					this.addClass(className);
				}
			}else{
				if(this.hasClass(className)){
					this.removeClass(className);
				}
			}
		}else{
			if(this.hasClass(className)){
				this.removeClass(className);
			}else{
				this.addClass(className);
			}	
		}
	}
	return factory(this);
}

function attr(name, value){
	var result;
	if(value == null){
		if (this.length > 0)
		    result = this[0].getAttribute(name);
		else
			return null;
	}else{
		if (this.length > 0){
		    this[0].setAttribute(name,value);
			result = this;
		}else
			return null;
	}
	return factory(result);
}

function css(assinStyle, value){
	if(typeof assinStyle === "object"){
		for(var i = 0; i < this.length; i++){
			for(var elem in assinStyle){
				this[i].style[elem] = assinStyle[elem];
			}
		}
		return factory(this);
	}else if(typeof assinStyle === "string" && value == null){
		if(this.length > 0){
			var computedStyle = window.getComputedStyle(this[0]);
			var res = computedStyle.getPropertyValue(assinStyle);
			return factory(res);
		}else return null;
	}else if(typeof assinStyle === "string" && typeof value === "string"){
		
		for(var i = 0; i < this.length; i++){
			this[i].style[assinStyle] = value;
		}
		return factory(this);
	}

}

function camelCase(input) { 
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

function data(){
	var args = Array.prototype.slice.call(arguments);
	var numArgs = args.length;
	//get All the data	
	if(numArgs === 0){
		var res = this[0].getAttributes();
		var r = [];
		for(var i = 0; i < res.length; i++){
			r.push(res[i]);
		}
		return r;
	}else if (numArgs === 1 && typeof args[0] === "object"){
		var obj = args[0];
		for(var i = 0; i < this.length; i++){
			for(var elem in obj){
				var e = camelCase(elem);
				this[i].dataset[e] = obj[e];
			}
		}
		return factory(this);
	}else if (numArgs >= 1){
		var r = [];
		for(var i = 0; i < numArgs; i++){
			if(this[0].hasAttribute(args[i])){
				var attribute = this[0].getAttribute(args[i]);
				r.push(attribute);
				
			}
		}
		return r;
	}
	
}
function factory(element) {
	element.first = first;
	element.last = last;
	element.each = each;
	element.find = find;
	element.hasClass = hasClass;
	element.addClass = addClass;
	element.removeClass = removeClass;
	element.toggleClass = toggleClass;
	element.attr = attr;
	element.css = css;
	element.data = data;
	return element;
	
}

window.JQClone = function (selector, search) {
	search = typeof search !== 'undefined' ? search : document;
	var result = [];
	if (typeof selector !== 'undefined') {
		var local = search.querySelectorAll(selector);
		//result = compose(local);
}
	return factory(local);
	//return factory(result);
};
window.$ = window.JQClone;
})(window, document);
