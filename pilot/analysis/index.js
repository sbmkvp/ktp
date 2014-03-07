//Setting the global vairables
var head,body;
var data, graph, layout, render;

//The variable which has all the parameters. this would be useful to sync elements and also to save configurations.
var	param = {
	//Properties of the object
	directed : true,
	layout : 'force',
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
		drawGraph(data,this);
	},
	setSplength : function (x) {
		this.springLength = x;
		drawGraph(data,this);
	},
	setSpcoeff : function (x) {
		this.springCoeff = x;
		drawGraph(data,this);
	},
	setGravity : function (x) {
		this.gravity = x;
		drawGraph(data,this);
	},
	setTheta : function (x) {
		this.theta = x;
		drawGraph(data,this);
	},
	setDgcoeff : function (x) {
		this.dragCoeff = x;
		drawGraph(data,this);
	},
	setDirected : function (x) {
		this.directed = x;
		drawGraph(data,this);
	},
	setData : function(x) {
		this.data = x;
		getData(x);
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
	getData(param.data);
	//Setting the behaviour of the 
	$('#layout').on('change',function(){ param.setLayout(this.value); });
	$('#data').on('change',function(){ param.setData(this.value); });
});

function drawGraph(d,p) {
	graph = Viva.Graph.graph();
	for (i in d.nodes) { var node = { name:d.nodes[i].nodeName }; graph.addNode(d.nodes[i].id,node); }
	for (i in d.links) { graph.addLink(d.links[i].source,d.links[i].target); }
	layout = layoutMaker.make(graph,p);
	if($('svg')[0]){$('svg').remove()}
	renderer = new Viva.Graph.View.renderer(graph,{ layout : layout, container : document.getElementById('visualisation')});
	renderer.run(); renderer.reset();
}

var layoutMaker = {
	names : ['Circular','Random','Force Directed'],
	layouts : {
		circle: function(g){
			l = new Viva.Graph.Layout.constant(g),
				nodePositions = [];
			for (var i=0; i<g.getNodesCount(); i++) {
				nodePositions.push({
					x:window.innerHeight*0.7/2*Math.cos(i*2*Math.PI/g.getNodesCount()),
					y:window.innerHeight*0.7/2*Math.sin(i*2*Math.PI/g.getNodesCount())
				});
			}
			l.placeNode(function(node){
				return nodePositions[node.id];
			});
			return l;
		},
		random: function(g){ 
			l = new Viva.Graph.Layout.constant(g),
				nodePositions = [];
			for (var i=0; i<g.getNodesCount(); i++) {
				nodePositions.push({
					x:0.7*window.innerHeight*Math.random(),
					y:0.7*window.innerHeight*Math.random()
				});
			}
			l.placeNode( function (node) { 
				return nodePositions[node.id];
			});
			return l;
		},
		force: function(g,p){
			l = new Viva.Graph.Layout.forceDirected(g,p);
			return l;
		}
	},
	make:function(g,p){
		if(Object.keys(this.layouts).indexOf(p.layout)<0) {
			return this.layouts.force(g,p);
		} else {
			return this.layouts[param.layout](g,p);
		}
	}
};

function getData(x) {
	$.getJSON('../lib/pull.php?table='+x,function(unrefined){
		$(unrefined).each(function(){this.people=$.parseJSON(this.people)});
		var refined = {}, refnames =[], id = 0;
		refined.nodes = [];
		refined.links = [];
		for(i in unrefined) {
			var rec = {};
			rec.id = id;
			rec.nodeName = unrefined[i].name;
			rec.role = unrefined[i].role;
			rec.org = unrefined[i].org;
			refined.nodes.push(rec);
			refnames.push(unrefined[i].name);
			id++;
		}
		for (i in unrefined) {
			for (j in unrefined[i].people) {
				var name = unrefined[i].people[j][0];
				if (refnames.indexOf(name)==-1) {
					var rec  = {};
					rec.id = id;
					rec.nodeName = name;
					rec.role = 'na';
					rec.org = 'na';
					refined.nodes.push(rec);
					refnames.push(name);
					id++;
				}
				if (unrefined[i].people[j][1]){
					var lnk = {};
					lnk.source = refined.nodes[i].id;
					lnk.target = refnames.indexOf(unrefined[i].people[j][0]);
					lnk.directed = 1;
					refined.links.push(lnk);
				}
			}
		}
		data = refined;
		drawGraph(data,param);
	});
}