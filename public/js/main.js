// main circle setup
var w = 800, h = 800;

// setup colors
var color = d3.scale.category20c();
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var outer_bubble = d3.layout.pack()
  .sort(null)
  .size([800, 800])
  .padding(1.5)
  .value(function(d) {
    return d.count;
  });

d3.json('/smaller_sample.json', function(root) {
  var rScale = d3.scale.linear()
    .domain([1, d3.max(root, function(d) { return d.count; })])
    .range([5, 35]);

  var xScale = d3.scale.linear()
    .domain([0, root.length])
    .range([30, w - 30 * 2]);

  var yScale = d3.scale.linear()
    .domain([0, root.length])
    .range([30, h - 30 * 2]);

  root.sort(function(a,b) {return b.count - a.count;});
  var mass = {};
  mass.children = root;

  node = svg.selectAll(".node")
    .data(outer_bubble.nodes(mass)
      .filter(function(d){return !d.children;}))
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
    .attr("r", function(d) { return d.r; })
    .style("fill", function(d) { return color(d.element); });

  node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) { return d.element; });
});
