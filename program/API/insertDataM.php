
<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 0);
require("dbconnect.php");

$sql = "insert into material (name,price) values ('"
	.$_GET["Mname"]."',".$_GET["Mprice"].")";
mysqli_query($conn,$sql);

header('Location: insertData.php');
?>