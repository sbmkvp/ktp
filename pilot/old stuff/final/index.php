<html>
<head>
	<title>Analysis</title>
	<link rel="stylesheet" type="text/css" href="index.css">
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="jquery.editable.min.js"></script>
	<script type="text/javascript" src="vivagraph.js"></script>
	<script src="http://code.highcharts.com/highcharts.js"></script>
	<script type="text/javascript" src="index.js"></script>
</head>
<body onresize="resize();">
	<div class="row">
		<div id="vis"></div>
		<div id="ana">
			<div id="gen" class="card">
				<div class="card-header">
					<div class="card-heading">General Information</div>
					<div class="glyphicon glyphicon-chevron-down grey right"></div>
				</div>
				<div class="card-content">
					<table class="prop-table">
						<tbody>
							<tr>
								<td>No. of People</td>
								<td>100</td>							
							</tr>
							<tr>
								<td>No. of Connections</td>
								<td>500</td>							
							</tr>
						</tbody>
					</table>
					<div id="degreedist" style="margin-bottom:15px;"></div>
					<div class="card-comment">This is a editable comment which can be appeded to each analysis, ultimately this will be expanded to provide a analysis and reporting tool</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>