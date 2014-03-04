var data,graph,layout,renderer,
	param={
		directed:true,
		layout:'circle',
		springLength : 15, springCoeff : 0.00002, gravity: -1,	theta : 0.8, dragCoeff : 0.05,
		data:'bankcle',
		setLayout: function (x) { this.layout=x; drawGraph(); },
		setSplength: function (x) { this.springLength=x; drawGraph(); },
		setSpcoeff: function (x) { this.springCoeff=x; drawGraph(); },
		setGravity: function (x) { this.gravity=x; drawGraph(); },
		setTheta: function (x) { this.theta=x; drawGraph(); },
		setDgcoeff: function (x) { this.dragCoeff=x; drawGraph(); },
		setDirected: function (x) { this.directed=x; drawGraph(); },
		setData: function(x) { this.data=x; $.getJSON('../lib/pull.php?table='+param.data,function(x){ data = refine(x); drawGraph();});}
	};

$(document).ready(function(){
	setMap();
	$.getJSON('../../lib/pull.php?table='+param.data,function(x){
		data = refine(x);
		drawGraph();
	});
	//Setting the behaviour of the 
	$('#layout').on('change',function(){ param.setLayout(this.value); });
	$('#data').on('change',function(){ param.setData(this.value); });


});

function drawGraph() {
	createGraph();
	makeLayout();
	if($('svg')[0]){$('svg').remove()}
	renderer = new Viva.Graph.View.renderer(graph,{ layout : layout, container : document.getElementById('visualisation')});
	renderer.run(); renderer.reset();
	setAnalysis();
	degdist();
}

function makeLayout() {
	if(param.layout=='circle'){
		layout = new Viva.Graph.Layout.constant(graph),
			nodePositions = [],
			n = graph.getNodesCount();
		for (var i=0; i<n; i++) { nodePositions.push({ x:window.innerHeight*0.7/2*Math.cos(i*2*Math.PI/n), y:window.innerHeight*0.7/2*Math.sin(i*2*Math.PI/n) }); }
		layout.placeNode(function(node) { return nodePositions[node.id]; });
	} else if (param.layout == 'random'){
		layout = new Viva.Graph.Layout.constant(graph),
			nodePositions = [],
			n = graph.getNodesCount();
		for (var i=0; i<n; i++) { nodePositions.push({ x:0.7*window.innerHeight*Math.random(), y:0.7*window.innerHeight*Math.random() }); }
		layout.placeNode(function(node) { return nodePositions[node.id]; });
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

function switchBet(){
	$('#wrapper').children().each(function(){
		$(this).toggleClass('hidden-xs');
	});
}

function createGraph() {
	g = Viva.Graph.graph();
	for (i in data.nodes) { var node = { name:data.nodes[i].nodeName }; g.addNode(data.nodes[i].id,node); }
	for (i in data.links) {	g.addLink(data.links[i].source,data.links[i].target); }
	graph = g;
}

function refine(unrefined) {
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
	return refined;
}

function setAnalysis() {
	$('#nodes').empty();$('#links').empty();$('#density').empty();$('#avgdeg').empty();
	$('#nodes').append('<b>Number of Nodes : </b>'+graph.getNodesCount());
	$('#links').append('<b>Number of Links : </b>'+graph.getLinksCount());
	$('#density').append('<b>Density of the Graph : </b>'+Viva.Graph.operations().density(graph));
	$('#avgdeg').append('<b>Average Degree : </b>'+Viva.Graph.operations().avgDegree(graph));
}

function degdist () {
	$('#degreedist').highcharts({
	    title: {
	        text: 'Degree Distribution',
	        x: -20 //center
	    },
	    xAxis: {
	        categories: ['0','5','10','15','20','25','30','35','>35']
	    },
	    yAxis: {
	        title: {
	        	enabled: false,
	            text: 'Degree'
	        },
	        plotLines: [{
	            value: 0,
	            width: 1,
	            color: '#808080'
	        }]
	    },
	    legend: {
	    	enabled: false,
	        layout: '',
	        align: 'right',
	        verticalAlign: 'middle',
	        borderWidth: 0
	    },
	    series: [{
	        name: 'Degree',
	        data: [5,31,8,4,4,6,2,2,1]
	    }]
	});
}