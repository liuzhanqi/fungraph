document.onload = (function (d3, saveAs, Blob, undefined) {

	var consts = {
    	defaultTitle: "random variable"
  	};

  	var dragNode = d3.behavior.drag()
	  	.on("drag", function (){
		    var dragTarget = d3.select(this);
		    dragTarget
		        .attr("cx", function() {
		        	return d3.event.dx + parseInt(dragTarget.attr("cx"));
		        })
		        .attr("cy", function() {
		        	return d3.event.dy + parseInt(dragTarget.attr("cy"));
		        });
		});

  	var Node = function(svg, x, y) {
  		if (Node.count == undefined) {
	    	Node.count = 1;
	    } else {
	    	Node.count ++;
	    }
	    var id = "Node_"+Node.count;
	    this.x=x;this.y=y;this.id=id;

  		var updateColor = function (node) {
			if (graph.state.selectedNode != node) {
	    		d3.select(node).style("fill", "white");
	    	} else {
	    		d3.select(node).style("fill", "LightCoral");
	    	}
		};

  		var newNode = svg.append("circle")
	        .style("stroke", "gray")
	        .style("fill", "white")
	        .attr("r", 40)
	        .attr("cx", x)
	        .attr("cy", y)
	        .attr("id", id)
	        .call(dragNode)
	        .on("mouseover", function(){
	        	d3.select(this).style("fill", "aliceblue");
	        })
	        .on("mouseout", function(){
	        	updateColor(this);
	        })
	        .on("click", function() {
	        	//click on node to select or deselect
	        	if (graph.state.selectedNode == this) {
	        		graph.state.selectedNode = null;
	        		d3.select(this).style("fill", "white");
	        	} else {
	        		oldNode = graph.state.selectedNode;
	        		graph.state.selectedNode = this;
	        		if (oldNode != null) {
	        			updateColor(oldNode);
	        		}
	        		updateColor(this);
	        	}
	        });
  	}

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
	    });
	    svg.on("dblclick", function() {
	    	console.log("double click at "+d3.mouse(this)+", created a node");
	    	var newNode = new Node(svg,d3.mouse(this)[0],d3.mouse(this)[1]);
	    	thisGraph.nodes.push(newNode);
	    	// for (var i in thisGraph.nodes) {
		   	// 	console.log(thisGraph.nodes[i].id);
	    	// }
	    });
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

