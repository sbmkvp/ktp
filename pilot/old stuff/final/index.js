$(document)
.ready(function(){
	$('.card-comment').editable();
	$('#degreedist')
		.height($('#degreedist').width())
		.highcharts({
			chart:			{
				type:'column',
				backgroundColor:'#f9f9f9',
				borderColor:'#bbbbbb',
				borderWidth:1
			},
			title:			{text:''},
			plotOptions:	{column:{
				animation:	false,
				borderColor:'#444444',
				borderWidth:0,
				color:		'#444444',
				enableMouseTracking:false,
				pointPadding:-0.2
			}},
			xAxis:			{
				labels:{enabled:false},
				title:{enabled:false},
				tickWidth:0,
				lineWidth: 0
			},
			yAxis:			{
				labels:{enabled:false},
				title:{enabled:false},
				gridLineWidth:0
			},
			legend:			{enabled:false},
			series:			[{name:'Degree',data:[5,31,8,4,4,6,2,2,1]}],
			credits:		{enabled:false}
		});
});

function resize() {
	$('#degreedist').height($('#degreedist').width());
}