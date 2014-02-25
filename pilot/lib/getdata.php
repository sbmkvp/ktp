<?php
	//Check if all the parameters are available
	if(!isset($_REQUEST['table'])){
		die('Missing Parameters.');
	}

	$table = $_REQUEST['table'];

	//Connect to server and select database
	$con = @mysqli_connect("localhost", "root", "AtomiC5657", "ktp");
	if (mysqli_connect_errno($con)) {
		$con = @mysqli_connect("db516200454.db.1and1.com", "dbo516200454", "Like\$amB6", "db516200454");
		if(mysqli_connect_errno($con)) {
			echo 'cannot connect to db';
		}
	}

	//Querying the database for authentication
	$sql="SELECT * FROM `$table`";
	$result=mysqli_query($con,$sql);

	//Convert results into an array
	$data = array();
	while ($row = mysqli_fetch_assoc($result)) {
		$data[]=$row;
	}

	//Return the results
	echo json_encode($data);

	mysqli_close($con);
?>