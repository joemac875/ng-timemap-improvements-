function timemap(parameters) {
/**
 * Define a name space for the application.
 */
app.dataset = parameters['data'];
app.buttons = AddCustomUIComponents(app);
app.map = new Map(app,app.dataset, parameters['map'],{},parameters['debug']);
app.map.initalize();    
app.timeline = new Timeline(parameters['timeline'],app.dataset,app.map,parameters['debug']);
}


