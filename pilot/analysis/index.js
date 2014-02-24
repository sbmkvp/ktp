var data,datag,graph,layout,renderer,
	param={
		directed:true,
		layout:'force',
		springLength : 20, springCoeff : 0.0001, gravity: -1.2,	theta : 0.8, dragCoeff : 0.02,
		setLayout: function (x) { this.layout=x; drawGraph(); },
		setSplength: function (x) { this.springLength=x; drawGraph(); },
		setSpcoeff: function (x) { this.springCoeff=x; drawGraph(); },
		setGravity: function (x) { this.gravity=x; drawGraph(); },
		setTheta: function (x) { this.theta=x; drawGraph(); },
		setDgcoeff: function (x) { this.dragCoeff=x; drawGraph(); },
		setDirected: function (x) { this.directed=x; drawGraph(); },
	};

$(document).ready(function(){
	setMap();
	drawGraph();
});

function drawGraph() {
		makeGraph();
		makeLayout();
		if($('svg')[0]){$('svg').remove()}
		renderer = new Viva.Graph.View.renderer(graph,{ layout : layout, container : document.getElementById('visualisation')});
		renderer.run(); renderer.reset();
}

function makeGraph() {
	graph = Viva.Graph.generator().balancedBinTree(5);
}

function makeLayout() {
	if(param.layout=='circle'){
		layout = new Viva.Graph.Layout.constant(graph),
			nodePositions = [],
			n = graph.getNodesCount();
		for (var i=0; i<n; i++) { nodePositions.push({ x:300*Math.cos(i*2*Math.PI/n), y:300*Math.sin(i*2*Math.PI/n) }); }
		layout.placeNode(function(node) { return nodePositions[node.id-1]; });
	} else if (param.layout=='force') {
		layout = new Viva.Graph.Layout.forceDirected(graph,param);
	} else {
		console.log('This layout is not supported hence reverted to force directed layout.')
		layout = new Viva.Graph.Layout.forceDirected(graph,param);
	}
}

function setMap() {
	var divht = $('body').height();
	var navht = $('nav').height();
	$('#visualisation').height(divht-navht);
	$('#analysis').height(divht-navht);
}