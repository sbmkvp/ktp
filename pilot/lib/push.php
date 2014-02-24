<?php
	if(!isset($_POST['table'])||!isset($_POST['name'])||!isset($_POST['org'])||!isset($_POST['role'])||!isset($_POST['invo'])||!isset($_POST['time'])||!isset($_POST['people'])){
		echo json_encode('missing a parameter');
		die();
	}
	$table=$_POST['table'];
	$name=$_POST['name'];
	$org=$_POST['org'];
	$role=$_POST['role'];
	$invo=$_POST['invo'];
	$time=$_POST['time'];
	$people=$_POST['people'];
	// Connect to server and select databse.
	mysql_connect("mysql5.000webhost.com", "a7633930_balaspa", "AtomiC5657")or die("authentication error");
	mysql_select_db("a7633930_hdtest")or die("database error");
	//Querying the database for authentication
	$sql="INSERT INTO `$table` (`name`,`org`,`role`,`invo`,`time`,`people`) VALUES ('$name','$org','$role','$invo','$time','$people')";
	//Execute the query and send the results back
	if (mysql_query($sql)) {
		echo json_encode('success');
	} else {
		echo json_encode("Query Error - $sql");
	}
	//Close the my SQL connection
	mysql_close();
?>