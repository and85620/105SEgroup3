<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 0);

//ctype=0,buy ; ctype=1,sell
$Stype = $_POST["type"];
$ShoppingCar = json_decode($_POST["list"],true);
for($i=0;$i<count($ShoppingCar);$i++)
{
    $typeYOO = $Stype?-1:1;
    $sql = "call BuySellThing($ShoppingCar[$i]['id'],$ShoppingCar[$i]['number'],$typeYOO);";
    $result = mysqli_query($conn,$sql);
}
?>