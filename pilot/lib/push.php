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
	
	//Connect to server and select database
	$con = @mysqli_connect("localhost", "root", "AtomiC5657", "ktp");
	if (mysqli_connect_errno($con)) {
		$con = @mysqli_connect("db516200454.db.1and1.com", "dbo516200454", "Like\$amB6", "db516200454");
		if(mysqli_connect_errno($con)) {
			echo 'cannot connect to db';
		}
	}

	//Querying the database for authentication
	$sql="INSERT INTO `$table` (`name`,`org`,`role`,`invo`,`time`,`people`) VALUES ('$name','$org','$role','$invo','$time','$people')";
	//Execute the query and send the results back
	if (mysqli_query($con,$sql)) {
		echo json_encode('success');
	} else {
		echo json_encode("Query Error - $sql");
		echo (mysqli_error($con));
	}

	//Close the my SQL connection
	mysqli_close($con);
?>