function editor(parent,options) {
	this.parent = parent || {};
	this.renderPoint = "body"
	this.key = "";
	if (options.hasOwnProperty('key')) {
		this.key = options.key;
	};
	if(options.hasOwnProperty('injectionpoint')) {
		this.renderPoint = options.injectionpoint;
	}
//private 
/*
@param{Object}
*/
function drawOptionZone(type,location) {
	var content = "";
$(location).append(" <div class=\"col-md-4\">"+content+"</div>");
}
//public
this.addGroup = function() {
console.log('addGroup')
}
this.addMarker =  function() {
console.log(this.parent.map)
}
this.addLayer =  function() {
console.log('Layer')
}
this.addImage = function() {
console.log('img')

}
this.deleteObject = function() {
console.log('del')

}
}