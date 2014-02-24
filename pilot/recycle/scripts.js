var count=0;
var refined = {};
$.getJSON('getdata.php?table=bankcle',function(data){
	count += data.length;
	$('#per').text((count/1.5).toFixed(2)+'% done!');
	$(data).each(function(){this.people=$.parseJSON(this.people)});
	for(i in data){
		$('#cle').append('<div>'+data[i].name+'</div>');
	}
	refined.nodes = [];
	refined.links = [];
	var refnames =[];
	var id = 0;
	for(i in data) {
		var rec = {};
		rec.id = id;
		rec.nodeName = data[i].name;
		rec.type = data[i].role;
		// rec.org = data[i].org;
		rec.focus = '0';
		rec.degree = Math.floor((Math.random()*10)+1);
		refined.nodes.push(rec);
		refnames.push(data[i].name);
		id++;
	}
	for (i in data) {
		for (j in data[i].people) {
			var name = data[i].people[j][0];
			if (refnames.indexOf(name)==-1) {
				var rec  = {};
				rec.id = id;
				rec.nodeName = name;
				rec.type = 'na';
				rec.org = 'na';
				rec.focus = '0';
				rec.degree = Math.floor((Math.random()*10)+1);
				refined.nodes.push(rec);
				refnames.push(name);
				id++;
			}
			if (data[i].people[j][1]){
				var lnk = {};
				lnk.source = refined.nodes[i].id;
				lnk.target = refnames.indexOf(data[i].people[j][0]);
				lnk.value = 4.0;
				lnk.type = 'has_concept';
				lnk.directed = 1;
				refined.links.push(lnk);
			}
		}
	}
	refined.graph = {"type": 1,"src_type": "Item","trg_type": "Item","directed": true};

	drawGraph(refined);
});

$.getJSON('getdata.php?table=banktsd',function(data){
	count += data.length;
	$('#per').text((count/1.5).toFixed(2)+'% done!');
	$(data).each(function(){this.people=$.parseJSON(this.people)});
	for(i in data){
		$('#tsd').append('<div>'+data[i].name+'</div>');
	}
});

$.getJSON('getdata.php?table=banktp',function(data){
	count += data.length;
	$('#per').text((count/1.5).toFixed(2)+'% done!');
	$(data).each(function(){this.people=$.parseJSON(this.people)});
	for(i in data){
		$('#tp').append('<div>'+data[i].name+'</div>');
	}
});



function drawGraph(data) {
	var graph = Viva.Graph.graph();
	var layout = Viva.Graph.Layout.forceDirected(graph,{springLength : 250});
	var countryColor = "#34495E";
	var conceptColor = "#3498DB";
	var focusDisplay = false;
	var focusNodeId;

	$.each(data.nodes, function(key,val){
		var node =  { 
			name: val.nodeName,
			type: val.type,
			degree: val.degree,
			isPinned: val.focus
		}
		if(focusDisplay){ 
			graph.addNode(val.id, node);
		} else { 
			if(val.focus == true){ focusNodeId = val.id; }
			if(val.focus == false){ graph.addNode(val.id, node); }
		}
	});

	$.each(data.links, function(key,val){
		if(focusDisplay){ 
			graph.addLink(val.source, val.target, val.value);
		} else { 
			if(val.source != focusNodeId && val.target != focusNodeId){graph.addLink(val.source, val.target, val.value); }
		}
	});

	var graphics = Viva.Graph.View.svgGraphics();
	var nodeSize = 15;
	highlightRelatedNodes = function(nodeId, isOn) {
		graph.forEachLinkedNode(nodeId, function(node, link){
			if (link && link.ui) {
				link.ui.attr('stroke-opacity', isOn ? '1' : '0.3');
				if(isOn){
					node.ui.childNodes[0].attr('fill', node.data['type'] == "Client" ? conceptColor : countryColor);
				} else {
					node.ui.childNodes[0].attr('stroke', 'white').attr('fill', node.data['type'] == "Client" ? conceptColor : countryColor);
				}
			}
		});
	};

	muteUnrelatedNodes = function(nodeId, isOn) {
		graph.forEachUnlinkedNode(nodeId, function(node){
			if(nodeId != node.id){
				node.ui.childNodes[0].attr('opacity', isOn ? '0.1' : '1');
				node.ui.childNodes[1].attr('opacity', isOn ? '0.1' : '1');
			}
		});
	};

	graphics.node(function(node) {
		var size = nodeSize + (2*node.data['degree']);
		var ui = Viva.Graph.svg('g'),
		svgText = Viva.Graph.svg('text')
			.attr('x',(size/2)+13)
			.attr('y', 5+(nodeSize/2)).text(node.data['name'])
			.attr('fill', node.data['type'] == "Client" ? conceptColor : countryColor)
			.attr('font-family', 'Helvetica,Arial')
			.attr('font-size', size/2+'px'),
		rec = Viva.Graph.svg('rect')
			.attr('width', size/2)
			.attr('height', size/2)
			.attr('fill', 'black')
			.attr('stroke', 'black')
			.attr('stroke-width', '2'),
		ellipse = Viva.Graph.svg('ellipse')
			.attr('cx', size/2).attr('cy', size/2)
			.attr('rx', size/4).attr('ry', size/4)
			.attr('stroke-width', '2')
			.attr('stroke', 'white')
			.attr('fill', node.data['type'] == "Client" ? 'gray' : 'red'),
		circle = Viva.Graph.svg('circle')
			.attr('cx', nodeSize/2)
			.attr('cy', nodeSize/2)
			.attr('r', size/2)
			.attr('stroke-width', '2')
			.attr('stroke', 'white')
			.attr('fill', node.data['type'] == "Client" ? conceptColor : countryColor);
		ui.append(circle);
		ui.append(svgText);
		$(ui).hover(function() {
			highlightRelatedNodes(node.id, true);
			muteUnrelatedNodes(node.id, true);
			svgText.attr('display', 'display');
			circle.attr('fill', 'white').attr('stroke', node.data['type'] == "Client" ? conceptColor : countryColor);
			$(this).css( 'cursor', 'pointer' );
		}, function() {
			highlightRelatedNodes(node.id, false);
			muteUnrelatedNodes(node.id, false);
			circle.attr('stroke', 'white').attr('fill', node.data['type'] == "Client" ? conceptColor : countryColor);
			$(this).css( 'cursor', 'default' );
		});
		return ui;
	}).placeNode(function(nodeUI, pos, node) {
		nodeUI.attr('transform', 'translate(' + (pos.x - nodeSize/2) + ',' + (pos.y - nodeSize/2) + ')');
	});

	graphics.link(function(link){
	return Viva.Graph.svg('line').attr('stroke', '#7F8C8D').attr('stroke-opacity', '0.3').attr('stroke-width', Math.sqrt(link.data));
	});

	var renderer = Viva.Graph.View.renderer(graph, {graphics : graphics,layout : layout,container : document.getElementById('map')});
	renderer.run();
}