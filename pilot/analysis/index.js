//Setting the global vairables
var head,body;
var data, graph, layout, render;

//The variable which has all the parameters. this would be useful to sync elements and also to save configurations.
var	param = {
	//Properties of the object
	directed : true,
	layout : 'circle',
	springLength : 15,
	springCoeff : 0.00002,
	gravity: -1,
	theta : 0.8,
	dragCoeff : 0.05,
	data : 'bankcle',
	width : 8,
	//Methods associated with the object
	setLayout : function (x) {
		this.layout = x;
		drawGraph();
	},
	setSplength : function (x) {
		this.springLength = x;
		drawGraph();
	},
	setSpcoeff : function (x) {
		this.springCoeff = x;
		drawGraph();
	},
	setGravity : function (x) {
		this.gravity = x;
		drawGraph(); },
	setTheta : function (x) {
		this.theta = x;
		drawGraph(); },
	setDgcoeff : function (x) {
		this.dragCoeff = x;
		drawGraph();
	},
	setDirected : function (x) {
		this.directed = x;
		drawGraph();
	},
	setData : function(x) {
		this.data = x;
		$.getJSON('../lib/pull.php?table='+param.data,function(x){
			data = refine(x); drawGraph();
		});
	},
	setWidth: function(x) {
		if(x>0 && x<12) {
			this.width = x;
			$('#visualisation').removeClass($('#visualisation').attr('class'));
			$('#visualisation').addClass('col-sm-'+this.width);
			$('#analysis').removeClass($('#analysis').attr('class'));
			$('#analysis').addClass('col-sm-'+(12-this.width));
		}
	}
}

//The execution of scripts Once the document is loaded
$(document).ready(function(){

});

//This is the layout maker object, which has the definitions for all possible layouts.
var layoutMaker = {
	pretty : ['Circular','Random','Force Directed'],
	layouts : {
		circle: function(){
			layout = new Viva.Graph.Layout.constant(graph),
				nodePositions = [];
			for (var i=0; i<graph.getNodesCount(); i++) {
				nodePositions.push({
					x:window.innerHeight*0.7/2*Math.cos(i*2*Math.PI/n),
					y:window.innerHeight*0.7/2*Math.sin(i*2*Math.PI/n)
				});
			}
			layout.placeNode(function(node){
				return nodePositions[node.id];
			});
		},
		random: function(){ 
			layout = new Viva.Graph.Layout.constant(graph),
				nodePositions = [];
			for (var i=0; i<graph.getNodesCount(); i++) {
				nodePositions.push({
					x:0.7*window.innerHeight*Math.random(),
					y:0.7*window.innerHeight*Math.random()
				});
			}
			layout.placeNode( function (node) { 
				return nodePositions[node.id];
			});
		},
		force: function(){
			layout = new Viva.Graph.Layout.forceDirected(graph,param);
		}
	},
	make:function(){
		if(Object.keys(this.layouts).indexOf(param.layout)<0) {
			this.layouts.force(); 
		} else {
			this.layouts[param.layout]();
		}
	}
};