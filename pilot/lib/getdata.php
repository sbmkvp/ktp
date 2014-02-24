<?php
	//Check if all the parameters are available
	if(!isset($_REQUEST['table'])){
		die('Missing Parameters.');
	}

	$table = $_REQUEST['table'];

	// Connect to server and select databse.
	mysql_connect("mysql5.000webhost.com", "a7633930_balaspa", "AtomiC5657")or die("authentication error");
	mysql_select_db("a7633930_hdtest")or die("database error");

	//Querying the database for authentication
	$sql="SELECT * FROM `$table`";
	$result=mysql_query($sql);

	//Convert results into an array
	$data = array();
	while ($row = mysql_fetch_assoc($result)) {
		$data[]=$row;
	}

	//Return the results
	echo json_encode($data);

	mysql_close();
?>