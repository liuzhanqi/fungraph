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
	    drawNode(this);
	    toggleSelectNode(this);

  		function updateColor (node) {
  			if (node == null) return;
			if (graph.state.selectedNode != node) {
	    		d3.select("#"+node.id).style("fill", "white");
	    	} else {
	    		d3.select("#"+node.id).style("fill", "LightCoral");
	    	}
		};

		function drawNode(node) { 
  			svg.append("circle")
		        .style("stroke", "gray")
		        .style("fill", "white")
		        .attr("r", 40)
		        .attr("cx", node.x)
		        .attr("cy", node.y)
		        .attr("id", node.id)
		        .call(dragNode)
		        .on("mouseover", function(){
		        	if (graph.state.selectedNode!=node )
		        		d3.select("#"+node.id).style("fill", "aliceblue");
		        })
		        .on("mouseout", function(){
		        	updateColor(node);
		        })
		        .on("click", function() {
		        	oldnode = graph.state.selectedNode;
		        	if (oldnode!=null && oldnode!=node && d3.event.shiftKey) {
		        		var newEdge = new Edge(svg,node,oldnode);
		        	}
		        	toggleSelectNode(node);
		        });
  		};

  		function toggleSelectNode(node) {
  			//cancel selection
  			if (graph.state.selectedNode == node) {
        		graph.state.selectedNode = null;
        		d3.select("#"+node.id).style("fill", "white");
        	} else {
        		oldnode = graph.state.selectedNode;
        		graph.state.selectedNode = node;
        		updateColor(oldnode);
        		updateColor(node);
        	}
  		};

  	}

  	var Edge = function(svg, node1, node2) {
  		if (Edge.count == undefined) {
	    	Edge.count = 1;
	    } else {
	    	Edge.count ++;
	    }
  		var x1=node1.x, y1=node1.y;
  		var x2=node2.x, y2=node2.y;
	    var id = "Edge_"+Edge.count;
	    this.node1=node1;this.node2=node2;
	    this.x1=x1;this.y1=y1;
	    this.x2=x2;this.y2=y2;
	    this.id=id;
	    svg.append("line")
			.style("stroke", "gray")
			.style("stroke-width", "3")
			.attr("x1", x1)
			.attr("y1", y1)
			.attr("x2", x2)
			.attr("y2", y2)
			.attr("id", id);
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
	    	//console.log("key down");
	    })
	    .on("keyup", function(){
	    	//thisGraph.svgKeyUp.call(thisGraph);
	    	//console.log("key up");
	    })
	    svg.on("mousedown", function(d){
	    	if (d3.event.shiftKey) {
	    	}
	    });
	    svg.on("mouseup", function(d){
	    	//thisGraph.svgMouseUp.call(thisGraph, d);
	    	//console.log("mouse up");
	    });
	    svg.on("dblclick", function() {
	    	console.log("double click at "+d3.mouse(this)+", created a node");
	    	var newNode = new Node(svg,d3.mouse(this)[0],d3.mouse(this)[1]);
	    	thisGraph.nodes.push(newNode);
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

