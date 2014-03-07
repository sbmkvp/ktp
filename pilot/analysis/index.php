<!DOCTYPE html>
<html>
	<head>
		<title>Analysis</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="index.css">
		<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script type="text/javascript" src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="../viva/vivagraph.js"></script>
		<script type="text/javascript" src="index.js"></script>
	</head>
	<body>
		<div id="wrapper" class="row">
			<div id="visualisation" class="col-sm-8">
				<select id="layout" class="form-control">
					<option value="circle">Circular Layout</option>
					<option value="force">Force Directed</option>
					<option value="random">Random Layout</option>
				</select>
				<div id="width-left" class="glyphicon glyphicon-step-backward hidden-xs" onclick="param.setWidth(param.width-1);"></div>
			</div>
			<div id="analysis" class="col-sm-4 hidden-xs">
				<div id="width-right" class="glyphicon glyphicon-step-forward hidden-xs" onclick="param.setWidth(param.width+1);"></div>
				<div id="nodes" style="margin-top:15px;"></div>
				<div id="links" style="margin-top:15px;"></div>
				<div id="density" style="margin-top:15px;"></div>
				<div id="avgdeg" style="margin-top:15px;"></div>
				<div id="degreedist" style="margin-top:15px;"></div>
			</div>
		</div>
	</body>
</html>