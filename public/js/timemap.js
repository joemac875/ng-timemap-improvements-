function timemap(parent,parameters) {
console.log(location.hash);
/* 
parent.dataset - array of formatted data objects for timemap
*/
parent.dataset = [];
/*
Check to see if timemap data is manually supplied or needs to be loaded via key.
*/
if ((parameters.hasOwnProperty('data')) && (parameters['data'].constructor === Array)) {
		parent.dataset = parameters['data'];
} else if ((parameters.hasOwnProperty('key')) && (typeof parameters['key'] ===  'String')) {
	alert('what the fuck')
	var loadData = new gDriveLoader(parameters['key']);
	if( typeof loadData === Array ) {
		parent.dataset = loadData;
		} else {
			alert('Error: Unable to load data \n'+String(loadData));
		}
	}
/*
Inject any custom openlayers buttons 
*/
parent.buttons = AddCustomUIComponents(app);
/*
Create and initialize map 
*/
parent.map = new Map(app,app.dataset, parameters['map'],{},parameters['debug']);
parent.map.initalize(); 
/*
Create and initialize timeline 
*/   
parent.timeline = new Timeline(parameters['timeline'],parent.dataset,parent.map,parameters['debug']);
}