function AddCustomUIComponents(timemap_instance) {
//
// Define map controls.
//
/*
Class FilterButton
defines an ol3 button which triggers the filter modal
*/
/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 * @param {Object=} caller
 */
timemap_instance.FilterButton = function(opt_options, parent) {

    var options = opt_options || {};
    var buttonParent = parent || {};
    var button = document.createElement('button');
    button.innerHTML = '<i data-toggle="tooltip" title="Filters" data-placement="right" class="fa fa-filter"></i>';

    var this_ = this;
    console.log(this);
    /*
    Opens Modal
    */
    var openFilter = function(e) {
        $('#filterModal').modal('toggle');
    };
    /*
    On Modal Close, Filter results
    */
    var closeFilter = function() {
        timemap_instance.map.toggleCategories();
    }
    $('#filterModal').on('hidden.bs.modal', closeFilter);
    button.addEventListener('click', openFilter, false);
    button.addEventListener('touchstart', openFilter, false);

    var element = document.createElement('div');
    element.className = 'filterButton ol-unselectable ol-control';
    element.appendChild(button);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

};
ol.inherits(timemap_instance.FilterButton, ol.control.Control);

/*
    Class EditButton
    defines an ol3 button which triggers the edit modal
     */
/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
timemap_instance.EditButton = function(opt_options, parent) {
    var options = opt_options || {};
    var button = document.createElement('button');
    button.innerHTML = '<i data-toggle="tooltip" title="Edit" data-placement="right"  class="fa fa-pencil"></i>';

    var this_ = this;
    /*
    Load edit view
    */
    var openEditModal = function(e) {
       window.location = "/edit/" + window.location.search + window.location.hash;
    };

    button.addEventListener('click', openEditModal, false);
    button.addEventListener('touchstart', openEditModal, false);

    var element = document.createElement('div');
    element.className = 'editButton ol-unselectable ol-control';
    element.appendChild(button);

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

};
ol.inherits(timemap_instance.EditButton, ol.control.Control);
}