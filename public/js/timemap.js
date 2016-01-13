/*
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Timemap Class
Initializes new timemap instances.
@param{Object} parent -> empty object defines application namespace
@param{Object} parameters -> object containing instance options
*/
function timemap(parent, parameters) {
    function initialize(parent, data) {
        console.log(data);
        parent.dataset = data.cus_unique();
        /*
        Inject any custom openlayers buttons 
        */
        parent.buttons = AddCustomUIComponents(app);
        /*
        Create and initialize map 
        */
        parent.map = new Map(app, app.dataset, parameters['map'], {}, parameters['debug']);
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
            //if ((parameters.)) && (typeof parameters['key'] ===  'String')) {
    } else {
        gDriveLoader(parameters['key'], initialize, parent);

    }

}