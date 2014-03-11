// A simple bar chart without much fuss
var barChart = function(name,data) {
	return {
		chart:{
			type:'column',
			backgroundColor:'#f9f9f9',
			borderColor:'#bbbbbb',
			borderWidth:1
		},
		title:{text:''},
		plotOptions:	{column:{
			animation:	false,
			borderColor:'#444444',
			borderWidth:0,
			color:		'#444444',
			enableMouseTracking:false,
			pointPadding:-0.2
		}},
		xAxis:{
			labels:{enabled:false},
			title:{enabled:false},
			tickWidth:0,
			lineWidth: 0
		},
		yAxis:{
			labels:{enabled:false},
			title:{enabled:false},
			gridLineWidth:0
		},
		series:[{'name':name,'data':data}],
		legend:{enabled:false},
		credits:{enabled:false}
	}
}