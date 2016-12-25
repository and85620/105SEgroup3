<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 0);

//ctype=0,buy ; ctype=1,sell
$Stype = $_POST["type"];
$ShoppingCar = json_decode($_POST["list"],true);
// for buy list
$sumcost = 0;
for($i=0;$i<count($ShoppingCar);$i++)
{
	//$ShoppingCar[$i]['id'].
	//$ShoppingCar[$i]['number']
	$sql = "select * from material where mid = $ShoppingCar[$i]['id']";
    $result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    $price = $rs['price'];
    $cost = $price * $ShoppingCar[$i]['number'];
    $sumcost = $sumcost + $cost;
}
    $sql2 = "select * from player;";
    $result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    $money = $rs['money'];
    if ($money >= $sumcost) {
        $sql3 = "update player set money = '$money'-'$sumcost';";
        $result3 = mysqli_query($conn,$sql3);
        //還沒update material
        return true;
    } else {
        return false;
    }
// for sell list
$sumsell = 0;
for($i=0;$i<count($ShoppingCar);$i++)
{
	//$ShoppingCar[$i]['id'].
	//$ShoppingCar[$i]['number']
	$sql = "select * from product where pid = $ShoppingCar[$i]['id']";
    $result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    $price = $rs['price'];
    $sell = $price * $ShoppingCar[$i]['number'];
    $sumsell = $sumsell + $sell;
}
    $sql2 = "select * from player;";
    $result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    $money = $rs['money'];
    if ($money >= $sumcost) {
        $sql3 = "update player set money = '$money'+'$sumcost';";
        $result3 = mysqli_query($conn,$sql3);
        // 還沒update product
        return true;
    } else {
        return false;
    }
?>