// A simple bar chart without much fuss
var barChart = function(name,data,ints) {
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
			enableMouseTracking:true,
			pointPadding:-0.2,
			states: {
				hover: {
					color:'#ff8000'
				}
			}
		}},
		tooltip: {
			shadow:false,
			backgroundColor:'rgba(249,249,249,1)',
			borderWidth:1,
			borderColor:'rgba(200,200,200,1)',
			borderRadius:0,
			headerFormat:'<span><b>{series.name}: </b>{point.key}</span><br/>',
			pointFormat:'<span style="color:{series.color}"><b>Count</b></span>: {point.y}<br/>',
			style: {
				color: '#444',
				fontSize: '10px',
				padding:'6px',
			}
		},
		xAxis:{
			categories: ints,
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