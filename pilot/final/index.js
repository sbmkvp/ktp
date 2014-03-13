$(document).ready(function(){
	pl = new plot('cle');
});

var card = function(results){
	var wrapper = $('<div class="card"></div>');
	$('#ana').append(wrapper);
	var header = $('<div class="card-header"></div>');
	wrapper.append(header);
	var heading = $('<div class="card-heading">'+results.name+'</div>');
	header.append(heading);
	var toggle = $('<span class="glyphicon glyphicon-chevron-up pull-right"></span>').on('click',function(){
		$(this).parent().parent().next().slideToggle(500);
		if($(this).attr('class').indexOf('glyphicon-chevron-down')>-1){
			$(this).removeClass('glyphicon-chevron-down');
			$(this).addClass('glyphicon-chevron-up');
		} else {
			$(this).removeClass('glyphicon-chevron-up');
			$(this).addClass('glyphicon-chevron-down');
		}
	});
	heading.append(toggle);
	var content = $('<div class="card-content"></div>');
	wrapper.append(content);
	if(results.table){
		var table = $('<table class="prop-table"></table>');
		var tablebody = $('<tbody></tbody>');
		for (i in results.table) { tablebody.append('<tr><td>'+results.table[i][0]+'</td><td>'+results.table[i][1]+'</td></tr>'); }
		content.append(table.append(tablebody));
	}
	if(results.charts) {
		for (i in results.charts) {
			var ch = $('<div class="chart"></div>');
			content.append(ch);
			ch.height(ch.width());
			ch.highcharts(new barChart(results.charts[i][0],results.charts[i][1],results.charts[i][2]));
		}
	}
	var comment = $('<div class="card-comment">Sample Comment</div>');
	comment.editable();
	content.append(comment);
	return wrapper;
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
	return self = {
		changeTo: function(x){
			var url = './lib/pull.php?table=bank'+x;
			$.getJSON(url,function(data){
				utils().dataCorrector(data);
				data = utils().refine(data);
				var graph = utils().makeGraph(data);
				self.setData(data,graph);
				self.genCards();
			});
		},
		setData: function(d,g){
			this.data=d;
			this.graph=g;
		},
		genCards: function(){
			if(this.cards){
				for(i in this.cards){
					this.cards[i].remove();
				}
			}
			var analysis = utils().analysis(this.graph);
			this.cards = [];
			for (i in analysis) {
				this.cards[i] = new card(analysis[i]);
			}
		},
		drawGraph: function(){
			console.log('hello');
		}
	};
}