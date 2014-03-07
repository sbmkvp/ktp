$(document).ready(function(){
	$('.card-comment').editable();
	$('#degreedist').highcharts({
		chart: {
			backgroundColor : '#dddddd',
		},
	    title: {
	        enabled:false,
	        text: 'Degree Distribution',
	    },
	    xAxis: {
	    	lables:{enabled:false},
	        categories: ['0','5','10','15','20','25','30','35','>35']
	    },
	    yAxis: {
	    	lables:{enabled:false},
	        title: { enabled: false, text: 'Degree' },
	        plotLines: [{ value: 0, width: 1, color: '#808080' }]
	    },
	    legend: { enabled: false },
	    series: [{ name: 'Degree', data: [5,31,8,4,4,6,2,2,1] }],
	    credits: { enabled:false }
	});
});