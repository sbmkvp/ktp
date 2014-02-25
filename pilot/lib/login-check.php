<?php
	if(!isset($_POST['password'])) {
		header('location:../index.php');
	}
	if($_POST['password']=='tflstaff'){
		session_start();
		$_SESSION['password'] = $_POST['password'];
		header($_SESSION['url']);
	} else {
		header("location:../index.php");
	}
?>