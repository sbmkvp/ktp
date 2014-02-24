<?php
	if(!isset($_POST['password'])) {
		header('location:../login.php');
	}
	if($_POST['password']=='tflstaff'){
		session_start();
		$_SESSION['password'] = $_POST['password'];
		header("location:../vis.php");
	} else {
		header("location:../login.php");
	}
?>