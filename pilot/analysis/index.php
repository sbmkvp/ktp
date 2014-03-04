<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script type="text/javascript" src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="index.js"></script>
		<style>
html, body, svg {
	height: 100%;
	width: 100%;
	margin: 0px;
	padding: 0px;
	display:block;
}

#visualisation {
	height: 100%;
	background-color: #ddd;
}

#analysis {
	height: 100%;
	background-color: #bbb;
	overflow: auto;
}

#layout {
	position: absolute;
	float: left;
	bottom: 10px;
	left: 10px;
	width: 200px;
}
</style>
	</head>
	<body>
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
	</body>
</html>