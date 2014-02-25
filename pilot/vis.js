var tracker = [
	['Andreas Feiersinger',0],
	['Martin Skiggs',0],
	['Andrew Spalding',0],
	['Andy Swift',0],
	['Barry Franklin',0],
	['Bob Townroe',0],
	['Clive Appleyard',0],
	['Danny Duggan',0],
	['Kirti Patel',0],
	['Eric Parry',0],
	['Ian Watkins',0],
	['Vince Mondesir',0],
	['Jamie Bell',0],
	['Jenny Hamilton',0],
	['John Chantler',0],
	['Jon Colclough',0],
	['Ka-Ho Li',0],
	['Keith Bowers',0],
	['Martin Roach',0],
	['Neil Moss',0],
	['Olly Newman',0],
	['Paul Drydon',0],
	['Gary Pollinger',0],
	['Roger Hewitt',0],
	['Samuel Palomo',0],
	['Simon Addyman',0],
	['Shaun Russell',0],
	['Richard Nicholl',0],
	['Tim Cooper',0],
	['Toby Nicholson',0],
	['Viki James',0],
	['Martin Edwards',0],
	['Harsh Lad',0],
	['David Adams',0],
//	['Phil Hallinan',0],
	['Mohamed Mukhred',0],
	['Mark Hinde',0],
	['Gabrielle Coyle',0],
	['Stephen Shires',0],
	['Gary Cole',0],
	['Jacqueline McDonagh',0],
	['Bob Shrubb',0],
	['Michael Smith',0],
	['Paul Berry',0],
];
var bankcle, banktsd, banktp;
var st = 0;
var graph, layer, renderer;
var timeout,interval;

$(document).ready(function(){
	//Key Press Overide to change the Screen
	$('html').keypress(function(e){ 
		var code = e.keyCode || e.which;
		if (code == 32) {
			window.clearInterval(interval);
			window.clearTimeout(timeout);
		} else {
			changeState();
		}
	});

	//Getting the data and drawing the tracker.
	$.getJSON('./lib/pull.php?table=bankcle',function(data1){ 
		$(data1).each(function(){this.people=$.parseJSON(this.people)});
		bankcle = data1;
		refreshTracker(bankcle);
		$.getJSON('./lib/pull.php?table=banktsd',function(data2){
			$(data2).each(function(){this.people=$.parseJSON(this.people)});
			banktsd = data2;
			refreshTracker(banktsd);
			$.getJSON('./lib/pull.php?table=banktp',function(data3){
				$(data3).each(function(){this.people=$.parseJSON(this.people)});
				banktp = data3;
				refreshTracker(banktp);
				refreshTable();
				timeout = setTimeout(function(){location.reload();},85000);
				interval = setInterval(function(){changeState();},10000);
			});
		});
	});
});

function refreshTable() {
	$('tbody').remove();
	$('#table1').append('<tbody id="tbody1"></tbody>');
	$('#table2').append('<tbody id="tbody2"></tbody>');
	$('#table3').append('<tbody id="tbody3"></tbody>');

	var temp = tracker.sort(function(b,a) {return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0));});
	//var br = Number(((temp.length+1)/3).toFixed(0))+1;
	var br = 15;
	for (i in temp) {
		var img = './images/'+tracker[i][1]+'.png';
		var percent = ((100/3)*tracker[i][1]).toFixed(0);
		if(i<br){ $('#tbody1').append('<tr><td>'+tracker[i][0]+'</td><td><img src="'+img+'" style="max-height:15px;"> '+percent+'%</td></tr>'); }
		if(i>(br-1) && i<(br*2)){ $('#tbody2').append('<tr><td>'+tracker[i][0]+'</td><td><img src="'+img+'" style="max-height:15px;"> '+percent+'%</td></tr>'); }
		if(i>(br*2-1)){ $('#tbody3').append('<tr><td>'+tracker[i][0]+'</td><td><img src="'+img+'" style="max-height:15px;"> '+percent+'%</td></tr>'); }
	}
	$('#counter').empty();
	$('#counter').append('<h1><strong>'+((bankcle.length+banktsd.length+banktp.length)/(tracker.length*3)*100).toFixed(0)+'%</strong> Done!</h1>');
}

function refreshTracker(data) {
	for (i in data) {
		var temp = [];
		for (j in tracker) { temp.push(tracker[j][0]); }
		x = temp.indexOf(data[i].name);
		if(x>-1){
			tracker[x][1]++;
		} else {
			var temprec = [data[i].name,1];
			tracker.push(temprec);
		}
	}
}

function convertGraph(unrefined) {
	var refined = {};
	refined.nodes = [];
	refined.links = [];
	var refnames =[];
	var id = 0;
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

function createGraph(data) {
	$('#dashboard').hide();
	$('#map').removeData();
	$('#map').remove();
	$('body').append('<div id="map" style="width:100%;height:100%;position:absolute;float:right;top:0px;right:0px;background-color:#eee"></div>')

	//Converting the raw data into suitable format.
	data = convertGraph(data);

	//Creating the simple network
	graph = Viva.Graph.graph();
	layout = Viva.Graph.Layout.forceDirected(graph, {
		springLength :25,
		springCoeff : 0.00003,
		dragCoeff : 0.06,
		gravity : -2
	});


	//Adding the nodes and Links
	for (i in data.nodes) {
		var node = {
			name:data.nodes[i].nodeName,
		}
		graph.addNode(data.nodes[i].id,node);
	}
	for (i in data.links) {
		graph.addLink(data.links[i].source,data.links[i].target);
	}

	//Defining the Look and Feel of the graph;
	var graphics = Viva.Graph.View.svgGraphics();
	graphics.node(function(node) {
		var size = node.links.length/1.5;
		if (size<1){size=1};
		var ui = Viva.Graph.svg('g'),
			svgText = Viva.Graph.svg('text')
				.attr('x',size*1.5)
				.attr('y',size*1.5)
				.attr('fill','#34495E')
				.attr('font-family', 'Helvetica,Arial')
				.attr('font-size',(10+size)+'px')
				.text(node.data['name']),
			circle = Viva.Graph.svg('circle')
				.attr('cx', 0)
				.attr('cy', 0)
				.attr('r', size*1.5)
				.attr('stroke-width', '2')
				.attr('stroke', 'white')
				.attr('fill','#34495E');
			ui.append(circle);
			ui.append(svgText);
			$(ui).hover(function() {
			
			});
		return ui;
	}).placeNode(function(nodeUI, pos, node) {
		nodeUI.attr('transform', 'translate(' + (pos.x - 0.5) + ',' + (pos.y - 0.5) + ')');
	});

	//Drawing the map
	renderer = Viva.Graph.View.renderer(graph,{
		container : $('#map')[0],
		layout : layout,
		graphics: graphics,
	});
	renderer.run();
}

function changeState() {
	st++;
	if(st%4==1) { createGraph(bankcle); $('.navbar-brand').text('Communication Network - Central Line Escalators');}
	if(st%4==2) { createGraph(banktsd); $('.navbar-brand').text('Communication Network - Track Support Design');}
	if(st%4==3) { createGraph(banktp); $('.navbar-brand').text('Communication Network - Transformer Protection and Switch Relocation');}
	if(st%4==0) { refreshTable();$('#dashboard').show(); $('#map').removeData(); $('#map').remove(); $('.navbar-brand').text('Organisational Network Survey - Completion status')}
}