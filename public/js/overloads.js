function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
/*
cus_unique() - returns unique elements in array
*/
Array.prototype.cus_unique = function(){
    var r, o, i, j, t, tt;
    r = [];
    o = {};
    for(i = 0; i < this.length; i++){
       t = this[i];
       tt = o[t] = o[t] || [];
       for(j = 0; j < tt.length; j++)
           if(tt[j] === this[i])
               break;
       if(j == tt.length)
           r.push(tt[j] = t);
     }
     return r;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
//http://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
Array.prototype.markers = function() {
    returnArray = [];
    for (i = 0; i < this.length; i++) {
        returnArray[i] = this[i].getFeature();
    }
    return returnArray;
};
// Function wiring prototypes to achieve inheritance
function inherits(Parent, Child) {
    function F() {}
    F.prototype = Parent;
    Child.prototype = new F();
}
//adds parameter to URL
function insertParam(key, value)
{
    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; 
    var x; 
    while(i--) {
        x = kvp[i].split('=');

        if (x[0]==key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&'); 
}
