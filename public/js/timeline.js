 // DOM element where the Timeline will be attached
  var container = document.getElementById('timeline');
  var data  = WoosterPoints.getTimelineObject();
  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet(data); 
//get first and last dates to set max and min with
  var firstPoint; var lastPoint;
  for (var i = data.length - 1; i >= 0; i--) {
    if (typeof(data[i].start) !== 'undefined') {
        if (data[i].start < firstPoint) 
             firstPoint = data[i].start;
        
        if (typeof(data[i].end) !== 'undefined') 
                lastPoint = data[i].end;
              else 
                 lastPoint = data[i].start;
    }
  };
  console.log(firstPoint,lastPoint);
    // Configuration for the Timeline
  var options = {};
  console.log(items);
  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);