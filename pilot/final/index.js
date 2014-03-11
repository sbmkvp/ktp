$(document).ready(function(){
	gen = card(analysis('general','somme useless stuff'));
	gen1 = card(analysis('general','somme useless stuff'));
	gen2 = card(analysis('general','somme useless stuff'));
	gen3 = card(analysis('general','somme useless stuff'));
	gen4 = card(analysis('general','somme useless stuff'));
	gen5 = card(analysis('general','somme useless stuff'));
	gen6 = card(analysis('general','somme useless stuff'));
	gen7 = card(analysis('general','somme useless stuff'));
});

var card = function(results){
	if (results==null){ return null; }
	var wrapper = $('<div class="card"></div>');
	$('#ana').append(wrapper);
	var header = $('<div class="card-header"></div>');
	wrapper.append(header);
	var heading = $('<div class="card-heading">'+results.name+'</div>');
	header.append(heading);
	var toggle = $('<span class="glyphicon glyphicon-chevron-down pull-right"></span>').on('click',function(){
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
			ch.highcharts(new barChart(results.charts[i][0],results.charts[i][1]));
		}
	}
	var comment = $('<div class="card-comment">Sample Comment</div>');
	comment.editable();
	content.append(comment);

	return wrapper;
}

var analysis = function (type,graph) {
	if(!graph){
		return null;
	}
	if (type=='general'){
		return {
			'name':'General Information',
			'table' : [
				['No. of People',100],
				['No. of Connections',500]
			],
			'charts' : [
				['degree',[5,31,8,4,4,6,2,2,1]]
			]
		}
	}
}