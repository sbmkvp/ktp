<!DOCTYPE html>
<html>
	<head>
		<title>Analysis</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="../lib/bootstrap-yeti.css">	
		<script type="text/javascript" src="../lib/jquery.js"></script>
		<script type="text/javascript" src="../lib/vivagraph.js"></script>
		<script type="text/javascript" src="../lib/highcharts.js"></script>
		<script type="text/javascript" src="../lib/exporting.js"></script>
		<script type="text/javascript" src="index.js"></script>
		<link rel="stylesheet" type="text/css" href="index.css">
		<script type="text/javascript" src="../lib/bootstrap.js"></script>
	</head>
	<body onresize="setMap();">
		<nav class="navbar navbar-default navbar-static-top">
			<div class="navbar-brand pull-left" style="display:flex;">Analysis for Issue # 
				<select id="data" class="form-control">
					<option value="bankcle">Central Line Escalators</option>
					<option value="banktsd">Track Support Design</option>
					<option value="banktp">Transformer Protection and Relocation</option>
				</select>
			</div>
		</nav>
		<div id="wrapper" class="row" style="margin:0px;">
			<div id="visualisation" class="col-sm-9">
				<select id="layout" class="form-control">
					<option value="circle">Circular Layout</option>
					<option value="force">Force Directed</option>
					<option value="random">Random Layout</option>
				</select>
			</div>
			<div id="analysis" class="col-sm-3 hidden-xs">
				<div id="nodes" style="margin-top:15px;"></div>
				<div id="links" style="margin-top:15px;"></div>
				<div id="density" style="margin-top:15px;"></div>
				<div id="avgdeg" style="margin-top:15px;"></div>
				<div id="degreedist" style="margin-top:15px;"></div>
			</div>
		</div>
		<!-- <div id="degreedist" style="position:absolute; float:left; top:50px; left: 15px; min-width: 310px; height: 400px; margin: 0 auto"></div> -->
	</body>
</html>