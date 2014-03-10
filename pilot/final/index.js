$(document).ready(function(){
	$('.card-comment').editable();
	$('#degreedist').height($('#degreedist').width()).highcharts({
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
	$('.toggle').on('click',function(){
		$(this).parent().parent().next().slideToggle(500);
		if($(this).attr('class').indexOf('glyphicon-chevron-down')>-1){
			$(this).removeClass('glyphicon-chevron-down');
			$(this).addClass('glyphicon-chevron-right');
		} else {
			$(this).removeClass('glyphicon-chevron-rigth');
			$(this).addClass('glyphicon-chevron-down');
		}
	});
	$('.card-header').on('dblclick',function(){
		console.log('hello');
		$(this).parent().flippy({
			color_target:'#f9f9f9',
			duration: "500",
			verso: $(this).parent().html()
		});
	});
});