<?php
	//Connect to server and select database
	$con = @mysqli_connect("localhost", "root", "AtomiC5657", "ktp");
	if (mysqli_connect_errno($con)) {
		$con = @mysqli_connect("db516200454.db.1and1.com", "dbo516200454", "Like\$amB6", "db516200454");
	}
?>