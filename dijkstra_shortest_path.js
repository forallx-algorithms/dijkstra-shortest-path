/*
  Dijkstra shortest path algorithm

  @author Evgeniy Kuznetsov
  @date 2.3.2015 5:00
 */

// section: Data definitions

// Edge is an object where the key head represent the key of the head node
//   key tail represent the key of the tail node
//   key dist represent distance
// var edgeExample = {head: 1, tail: 2, dist: 10};

// section: Helpers

// Detects edge where head in frontier and tail is not in frontier
// @param {Array.<Integer>} frontier Keys of the nodes what in frontier
// @param {Edge} e
// @return {Boolean}
var fEdge = function(frontier, e){
  return (frontier.indexOf(e.head)!=-1) && (frontier.indexOf(e.tail)==-1)
}

// Calculates Dijkstra's greedy score for a given node
// @param {Object} distances Calculated distances
// @param {Edge} e
// @return {Integer}
var cGreedy = function(distances, e){
  return distances[e.head] + e.dist;
}

// section: Main function

// @param {Integer} s Start key
// @param {Integer} v End key
// @param {Array.<Integer>} nodes Array of nodes keys
// @param {Array.<Edge>} edges Array of edges
// @return {Integer} Distance
function dijkstraShortestPath(s, v, nodes, edges){

  var frontier = [s];

  var distance = {};
  distance[s] = 0;

  while(frontier.indexOf(v)==-1){

    // Find edges where head in frontier and tail not in frontier
    var fedges = edges.filter(function(e){return fEdge(frontier,e)});

    // For every edge calculate greedy score
    var gscores = fedges.map(function(e){return cGreedy(distance, e)});

    // Choose edge with minimal greedy score
    var mgs = Math.min.apply(this, gscores);
    var minedge = fedges[gscores.indexOf(mgs)];
    var nchosen = minedge.tail;

    // Update frontier with a chosen node
    frontier.push(nchosen);

    // Save distance for chosen node
    distance[nchosen] = mgs;
  }

  return distance[v];
}


// section: Tests

var nodesExample = [1,2,3,4];
var edgesExample = [
  {head: 1, tail: 2, dist: 3},
  {head: 1, tail: 3, dist: 4},
  {head: 2, tail: 4, dist: 3},
  {head: 2, tail: 3, dist: 1},
  {head: 3, tail: 4, dist: 1}
];


console.log("Case 1:", edgesExample.filter(function(e){return fEdge([1], e)}).length==2, edgesExample.filter(function(e){return fEdge([1], e)}));
console.log("Case 2:", dijkstraShortestPath(1,4,nodesExample,edgesExample)==5, dijkstraShortestPath(1,4,nodesExample,edgesExample));

