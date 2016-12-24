<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 0);

//ctype=0,buy ; ctype=1,sell
$Stype = $_POST["type"];
$ShoppingCar = json_decode($_POST["list"],true);

for($i=0;$i<count($ShoppingCar);$i++)
{
	//$ShoppingCar[$i]['id'].
	//$ShoppingCar[$i]['number']
	$sql = select price from 
}

?>