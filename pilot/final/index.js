var pal = {
	'TfL': '#fe9a2e',
	'LUL':'#fe9a2e',
	'Dragados':'#0B3861',
	'URS':'#80A453',
	'Wilkinson Eyre':'#f2de5d',
	'Others':'#848484',
}

$(document).ready(function(){
	pl = new plot('cle');
});

var card = function(results){
	var wrapper = $('<div class="card"></div>');
	$('#ana').append(wrapper);
	var header = $('<div class="card-header"></div>'); wrapper.append(header);
	header.click(function(){
		$(header).trigger('headerclicked',results.name);
	})
	var heading = $('<div class="card-heading">'+results.name+'</div>'); header.append(heading);
	var toggle = $('<span class="glyphicon glyphicon-chevron-down pull-right"></span>'); heading.append(toggle)
	toggle.click(function(){
		var tempc = $(this).parent().parent().next();
		if(tempc.is(':visible')){
			tempc.slideUp(500);
			$(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
		} else {
			tempc.slideDown(500);
			$(this).removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
		}
	})
	var content = $('<div class="card-content"></div>'); wrapper.append(content);
	if(results.table){
		var table = $('<table class="prop-table"></table>');
		var tablebody = $('<tbody></tbody>');
		for (i in results.table) { tablebody.append('<tr><td>'+results.table[i][0]+'</td><td>'+results.table[i][1]+'</td></tr>'); }
		content.append(table.append(tablebody));
	}
	if(results.charts) {
		for (i in results.charts) {
			var row = $('<div class="row" style="margin-bottom:15px;"></div>');content.append(row)
			var ch = $('<div class="col-xs-6" style="max-height:150px;"></div>');row.append(ch);
			ch.height(ch.width());
			ch.highcharts(new barChart(results.charts[i][0],results.charts[i][1],results.charts[i][2]));
			var ls = $('<div class="col-xs-6" style="padding-left:0px;"></div>');row.append(ls);
			var lstab = $('<table class="prop-table"></table>');ls.append(lstab);
			// lstab.append('<thead><tr><th>Name</th><th>Degree</th></tr></thead>');
			// resglob.push(results);
			for (j in results.charts[i][3]){
				lstab.append ('<tr><td>'+results.charts[i][3][j].name.split(' ')[0]+' .'+results.charts[i][3][j].name.split(' ')[1].slice(0,1)+'</td><td>'+results.charts[i][3][j].value.toFixed(0)+'</td></tr>')
			}
		}
	}
	if(results.legend) {
		var legend = $('<table class="prop-table"></table>');
		var legBody = $('<tbody></tbody>');
		for (i in Object.keys(pal)) { legBody.append('<tr><td>'+Object.keys(pal)[i]+'</td><td>'+results.legend[1][results.legend[0].indexOf(Object.keys(pal)[i])]+'</td><td style="background-color:'+pal[Object.keys(pal)[i]]+';width:25px;"></td></tr>'); }
		content.append(legend.append(legBody));
	}
	var comment = $('<div class="card-comment">Sample Comment</div>').editable(); content.append(comment);
	return {
		'name' : results.name,
		'data' : results,
		'header' : header,
		'heading': heading,
		'content' : content,
		'tog' : toggle,
		'wrapper' : wrapper,
		'comment' : comment
	};
}

var plot = function(issue,layout){
	issue = issue || 'cle';
	layout = layout || 'force';

	var self = this;
	var url = './lib/pull.php?table=bank'+issue;
	$.getJSON(url,function(data){
		utils().dataCorrector(data);
		data = utils().refine(data);
		var graph = utils().makeGraph(data);
		self.setData(data,graph);
		self.genCards();
		self.drawGraph();
	});
	$(document).on('headerclicked',function(e,d){
		self.select(d)
	});
	return self = {
		changeTo: function(x){
			var url = './lib/pull.php?table=bank'+x;
			$.getJSON(url,function(data){
				utils().dataCorrector(data);
				data = utils().refine(data);
				var graph = utils().makeGraph(data);
				self.setData(data,graph);
				self.genCards();
				self.drawGraph();
			});
		},
		setData: function(d,g){
			this.data=d;
			this.graph=g;
		},
		genCards: function(){
			if(this.cards){
				for(i in this.cards){
					this.cards[i].wrapper.remove();
				}
			}
			var analysis = utils().analysis(this.graph);
			this.cards = [];
			for (i in analysis) {
				this.cards[i] = new card(analysis[i]);
			}
		},
		drawGraph: function(){
			if($('#vis').children('svg')[0]){$('#vis').children('svg').remove();}
			this.layout = Viva.Graph.Layout.forceDirected(this.graph,{
                        springLength : 1.5,
                        springCoeff : 0.00001,
                        dragCoeff : 0.05,
                        gravity : -1,
                        theta:0.8
                    });
			this.graphics = Viva.Graph.View.svgGraphics();
			this.graphics.node(function(node) {
				// var size = node.links.length/2.2;
				// if (size<.5){size=.5};
				var ui = Viva.Graph.svg('g'),
					svgText = Viva.Graph.svg('text')
						// .attr('x',size*1.2)
						// .attr('y',size*1.2)
						.attr('x',5)
						.attr('y',5)
						.attr('fill','#444')
						.attr('font-family', 'Helvetica,Arial')
						// .attr('font-size',(5+size)+'px')
						.attr('font-size','8px')
						.text(node.data['name']),
					circle = Viva.Graph.svg('circle')
						.attr('cx', 0)
						.attr('cy', 0)
						// .attr('r', size*1.5)
						.attr('r', 10)
						.attr('stroke-width', '0')
						.attr('stroke', '#444')
						.attr('fill',(pal[node.data.org]? pal[node.data.org] :pal['Others']));
					ui.append(circle);
					ui.append(svgText);
					$(ui).hover(function() {
					
					});
				return ui;
			}).placeNode(function(nodeUI, pos, node) {
				nodeUI.attr('transform', 'translate(' + (pos.x - 0.5) + ',' + (pos.y - 0.5) + ')');
			});

			this.graphics.link(function(link){
				return Viva.Graph.svg('line')
					.attr('stroke', '#000')
					.attr('stroke-opacity', '0.1')
					.attr('stroke-width', 1);
			});
		this.renderer = Viva.Graph.View.renderer(this.graph,{layout:this.layout,container:document.getElementById('vis'),graphics:this.graphics});
		this.renderer.run();
		var ren = this.renderer
		this.select('General Information')
		},
		select:function(name){
			for(i in this.cards) {
				if (this.cards[i].name==name) {
					this.cards[i].header.css('background-color','#858585');
					this.cards[i].heading.css('color','#fff');
				} else {
					this.cards[i].header.css('background-color','#ccc');
					this.cards[i].heading.css('color','#333');
				}
			}
			var gr = this.graph;
			var gra = this.graphics;
			if(name == 'Connectivity') {
				gr.forEachNode(function(node){ $(gra.getNodeUI(node.id)).children('circle').attr('r',node.links.length/1.5)});
			} else if (name =='Centralness') {
				var cent = Viva.Graph.centrality().betweennessCentrality(gr).sort(function(a,b){ if (Number(a.key)<Number(b.key)){ return -1; } if (Number(a.key)>Number(b.key)){ return 1; } return 0; });
				gr.forEachNode(function(node){node.cent = cent[node.id].value});
				gr.forEachNode(function(node){ $(gra.getNodeUI(node.id)).children('circle').attr('r',node.cent/15)});
			} else if(name == 'General Information'){
				gr.forEachNode(function(node){ $(gra.getNodeUI(node.id)).children('circle').attr('r',10)});
			}
		},
		test : function() {
			return url;
		}
	};
}