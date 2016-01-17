/*
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*
Begin library includes



var script   = document.createElement("script");
script.type  = "text/javascript";
script.src   = "path/to/your/javascript.js";    // use this for linked script
document.body.appendChild(script);
*/
/*
Timemap Class
Initializes new timemap instances.
@param{Object} parent -> empty object defines application namespace
@param{Object} parameters -> object containing instance options
*/
function timemap(parent, parameters) {
    /*
    Get zoom, latitude, and longitude (and angle) from the hash
    */
    parent.mapInitalState = {};
    if (window.location.hash.length > 1) {
        var mapparams = window.location.hash.split('/');
        if (mapparams.length >= 3) {
        //remove the #map= section of the first parameter
        mapparams[0] = mapparams[0].split('=')[1] || 3;
        //get basemap from URL parameter
        parent.mapInitalState.latitude = mapparams[1];
        parent.mapInitalState.longitude = mapparams[2];
        //create center point from latitude and longitude for openlayers
        parent.mapInitalState.center = [parent.mapInitalState.latitude, parent.mapInitalState.longitude];
        parent.mapInitalState.zoom = mapparams[0];
        parent.mapInitalState.rotation = mapparams[3].split('&')[0] || 0;
        //get initial time frame for visjs
        parent.mapInitalState.startDate = mapparams[3].split('&')[1] || '';
        parent.mapInitalState.startDate = parent.mapInitalState.startDate.split('=')[1];
        parent.mapInitalState.endDate = mapparams[4] || '';
        } else {
            console.log('Error: Invalid parameters, cannot render map from supplied data');
        }   
    }
/* Add bootstrap modal for filters */
$( "body" ).append( '    <div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">        <div class="modal-dialog" role="document">            <div class="modal-content">                <div class="modal-header">                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>                    <h4 class="modal-title" id="myModalLabel">Hide or show map layers</h4>                </div>                <div class="modal-body">                    <div id="filters"></div>                </div>                <div class="modal-footer">                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>                </div>            </div>        </div>    </div>' );

/*
initialize() -- initializes timemap components
@param{object} parent -> parent object from constructor
@param{Array}  data -> array of Categories and Layers
*/
function initialize(parent, data) {

    parent.dataset = data.cus_unique();
    /*
    Inject any custom openlayers buttons 
    */
    parent.buttons = AddCustomUIComponents(app);
    /*
    Create and initialize map 
    */
    parent.map = new Map(app, app.dataset, parameters['map'], parent.mapInitalState, parameters['debug']);
    parent.map.initalize();
    /*
    Create and initialize timeline 
    */
    parent.timeline = new Timeline(parameters['timeline'], parent.dataset, parent.map, parameters['debug']);
}
/* 
parent.dataset - array of formatted data objects for timemap
*/
parent.dataset = [];
/*
Check to see if timemap data is manually supplied or needs to be loaded via key.
*/
if ((parameters.hasOwnProperty('data')) && (parameters['data'].constructor === Array)) {
    initialize(parent, parameters['data'])
} else {
    /*
    */
    gDriveLoader(parameters['key'], initialize, parent);

}

}