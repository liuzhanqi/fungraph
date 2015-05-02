document.onload = (function (d3, saveAs, Blob, undefined) {

	var consts = {
    	defaultTitle: "random variable"
  	};

	var GraphCreator = function(svg, nodes, edges) {
		var thisGraph = this;
		
		thisGraph.idct = 0;

		thisGraph.nodes = nodes || [];
    	thisGraph.edges = edges || [];

    	thisGraph.svg = svg;
    	thisGraph.svgG = svg.append("g").classed("graph", true);
    	var svgG = thisGraph.svgG;

    	thisGraph.state = {
	      selectedNode: null,
	      selectedEdge: null,
	      mouseDownNode: null,
	      mouseDownLink: null,
	      justDragged: false,
	      justScaleTransGraph: false,
	      lastKeyDown: -1,
	      shiftNodeDrag: false,
	      selectedText: null
	    };

	    GraphCreator.prototype.setIdCt = function(idct){
    		this.idct = idct;
  		};

	    //listen for key events
	    d3.select(window)
	    .on("keydown", function(){
	    	//thisGraph.svgKeyDown.call(thisGraph);
	    	console.log("key down");
	    })
	    .on("keyup", function(){
	    	//thisGraph.svgKeyUp.call(thisGraph);
	    	console.log("key up");
	    })
	    svg.on("mousedown", function(d){
	    	//thisGraph.svgMouseDown.call(thisGraph, d);
	    	//console.log("mouse down");
	    });
	    svg.on("mouseup", function(d){
	    	//thisGraph.svgMouseUp.call(thisGraph, d);
	    	//console.log("mouse up");
	    })
	    .on("dblclick", function() {
	    	console.log("double click at "+d3.mouse(this));
	    });;

	    //double click, create a new node
	    // thisGraph.prototype.on("dblclick", function() {
	    // 	console.log("hello");
	    // });
	}


	var docEL = document.documentElement,
		bodyEL = document.getElementsByTagName('body')[0];

	var width = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth,
		height =  window.innerHeight|| docEl.clientHeight|| bodyEl.clientHeight;

	var xLoc = width/2 - 25,
		yLoc = 100;

	var nodes = [];
	var edges = [];

	var svg = d3.select("#graph").append("svg")
				.attr("width",width)
				.attr("height",height);
	var graph = new GraphCreator(svg, nodes, edges);
		graph.setIdCt(2);
})(window.d3, window.saveAs, window.Blob);

