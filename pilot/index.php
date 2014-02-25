<?php
	session_start();
	$_SESSION['url']=$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
	if(isset($_SESSION['password'])){
		header('location:./tracker/vis.php');
	}
?>

<!DOCTYPE HTML>
<html>
	<head>
		<title>Login</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="./lib/bootstrap-yeti.css">
		<script type="text/javascript" src="./lib/jquery.js"></script>
		<script type="text/javascript" src="./lib/bootstrap.js"></script>	
	</head>
	<body style="padding-top:75px;background-color:#eee">
		<div id="content" class="container">
			<div class="row">
				<div class="col-md-4 col-lg-4 col-sm-3 col-xs-1"></div>
				<div class="col-md-4 col-lg-4 col-sm-6 col-xs-10">
					<div class="panel panel-default">
						<div class="panel-body" style="background-color:#eee;text-align:center;padding:20px;">
							<form role="form" method="post" action="./lib/login-check.php">
								<div class="input-group">
									<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
									<input type="password" class="form-control" id="password" name="password" placeholder="Please Enter the password">
								</div>
						</div>
						<div class="panel-footer" style="padding:10px;text-align:center;">
							<button type="submit" class="btn btn-warning btn-md" style="padding:3px 8px">Access</button>
							</form>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-lg-4 col-sm-3 col-xs-1"></div>
			</div>
		</div>
	</body>
</html>