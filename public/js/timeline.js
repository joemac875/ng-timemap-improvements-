//timeline class
function Timeline(renderpoint,objects) {

if ((typeof(renderpoint) === 'undefined') || typeof(objects) === 'undefined') {
    alert('Error: Invalid timeline parameters');
  }
  console.log(renderpoint,objects);
 // DOM element where the Timeline will be attached
  var container = document.getElementById(String(renderpoint));
  //load data points
  var data = [];
  if(objects.constructor === Array) {
    for (var i = objects.length - 1; i >= 0; i--) {
      data.push(objects[i].getTimelineObject());
    };
    } else {
      //only a single category of data exists
      data = objects.getTimelineObject();
      console.log(data);
    }
  /*
     Begin declaration of class variables
  */
  // Create the vis DataSet 
  this.items = new vis.DataSet(data); 
  // Configuration for the Timeline
  this.options = {};
  this.showCurrentTime = false; // do not display bar at the current date
  //get first and last dates to set max and min with
  this.options.min = data[0].start;
  /*
      End declaration of class variables
  */
  //set visjs timeline maximum and minimum
  for (var i = data.length - 1; i >= 0; i--) {
    if (typeof(data[i].start) !== 'undefined') {
        if (data[i].start < this.options.min) 
               this.options.min = data[i].start;
    }
  }
   /* Construct timeline */
   this.tm = new vis.Timeline(container, this.items, this.options);
   /*  Listen for timeline range changes */
   this.tm.on('rangechanged', function (props) {
     this.visibleItems = props;

    });
    /*  Listen for clicks on timeline elements */
   this.tm.on('select', function (properties) {
    console.log(properties);
    });
   /*
      Begin defintion of class methods
   */
   this.itemsonTimeline = function() {
    if ((typeof(this.visibleItems) === 'undefined')) {
      return this.visibleItems;
    } else {
      return this.tm.getVisibleItems();
   }
 }
};
  // Create a Timeline
var timeline = new Timeline('timeline',WoosterPoints);
console.log(timeline.itemsonTimeline());