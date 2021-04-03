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

//Append the x and y axis labels to the svg
//Using code from stack overflow https://stackoverflow.com/questions/11189284/d3-axis-labeling

//x axis label
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", svgWidth-400)
    .attr("y", svgHeight - 6)
    .text("In Poverty (%)");

//y axis label
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -300)
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Lacks Healthcare (%)");


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

    //Code from stack overflow to add text to the circles
    // Link to code https://stackoverflow.com/questions/36954426/adding-label-on-a-d3-scatter-plot-circles
    var gdots =  svg.selectAll("g.dot")
            .data(data)
            .enter().append('g');

    gdots.append("circle")
            .attr("class", "dot")
            .attr("r", 6.0)
            .attr("cx", function (d) {
                return xLinearScale(d.poverty);
            })
            .attr("cy", function (d) {
                return yLinearScale(d.healthcare);
            })
            .style("fill", "#50C2E3")

    gdots.append("text").text(function(d){
                    return d.abbr;
                })
                .attr("x", function (d) {
                    return xLinearScale(d.poverty);
                })
                .attr("y", function (d) {
                    return yLinearScale(d.healthcare);
                });
    



})
