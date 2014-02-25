<?php
	//Check if all the parameters are available
	if(!isset($_REQUEST['table'])){
		die('Missing Parameters.');
	}

	$table = $_REQUEST['table'];

	//Connect to server and select database
	include('dbconnect.php');

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