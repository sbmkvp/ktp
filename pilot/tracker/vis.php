<?php
	session_start();
	$_SESSION['url']=$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
	if(!isset($_SESSION['password'])){
		header("location:../index.php");
	}
?>

<!DOCTYPE HTML>
<html>
	<head>
		<title>Bank | Survey Tracker</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="../lib/bootstrap-yeti.css">
		<link rel="stylesheet" type="text/css" href="./vis.css">
		<script type="text/javascript" src="../lib/jquery.js"></script>
		<script type="text/javascript" src="../lib/bootstrap.js"></script>
		<script type="text/javascript" src="../lib/vivagraph.js"></script>
		<script type="text/javascript" src="./vis.js"></script>
	</head>
	<body>
		<nav id="header" class="navbar navbar-default navbar-static-top" role="navigation">
			<div class="navbar-header">
				<a class="navbar-brand brand-center" style="text-align:center">Organisational Network Survey - Completion Status</a>
			</div>
		</nav>
		
		<div id="dashboard" class="container">
			<div class="panel panel-default">
				<div class="panel-body" style="text-align:center;">
					<div id="counter"></div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<table id="table1" class="table table-bordered table-condensed table-striped">
						<thead height="15px;">
							<th width="65%" style="vertical-align:middle;">Personnel</th>
							<th width="35%" style="vertical-align:middle;">Status</th>
						</thead>
						<tbody id="tbody2">

						</tbody>
					</table>
				</div>
				<div class="col-md-4">
					<table id="table2" class="table table-bordered table-condensed table-striped">
						<thead height="15px;">
							<th width="65%" style="vertical-align:middle;">Personnel</th>
							<th width="35%" style="vertical-align:middle;">Status</th>
						</thead>
						<tbody id="tbody2">

						</tbody>
					</table>
				</div>
				<div class="col-md-4">
					<table id="table3" class="table table-bordered table-condensed table-striped">
						<thead height="15px;">
							<th width="65%" style="vertical-align:middle;">Personnel</th>
							<th width="35%" style="vertical-align:middle;">Status</th>
						</thead>
						<tbody id="tbody3">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</body>
</html>