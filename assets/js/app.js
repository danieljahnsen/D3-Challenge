// @TODO: YOUR CODE HERE

//Defint SVG area usaing the code from class activities
// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 700;

// Define the chart's margins as an object
var chartMargin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//create the scatter plot

d3.csv("assets/data/data.csv").then(function(data){
    console.log(data);
    //Store the values for the scatter plot poverty vs healthcare
    var states = [];
    var healthcare = [];
    var poverty = [];

    for (i=0; i < data.length; i++){
        states.push(data[i].abbr);
        healthcare.push(data[i].healthcare);
        poverty.push(data[i].poverty);
    };

    console.log(poverty);

    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xLinearScale = d3.scaleLinear()
        .domain([8,22])
        .range([0, chartWidth]);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
        .domain([0, 24.9])
        .range([chartHeight, 0]);

    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale).ticks(10);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);


    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    
    //Add the scatter dots
    chartGroup.selectAll("#scatter")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 6.0)
        .style("fill", "#69b3a2")



})
