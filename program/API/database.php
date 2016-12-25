<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 0);
require("dbconnect.php");
function getplayerdata(){
 	global $conn;
	$sql = "select * from player;";
    $result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    $datas = array('name'=>$rs['name'] ,'id'=>1,'Money'=>$rs['money']);
	echo json_encode($datas);  
} 
function getbuyinglist() {
	global $conn;
    $result_data = array("inpData"=>array());
    $sql = "select * from material ;";
	$result = mysqli_query($conn,$sql);
    while (($rs=mysqli_fetch_assoc($result))) {
        $mid =$rs['mid'];
        $name =$rs['name'];
        $price =$rs['price'];
        $result_data["inpData"][] = array(
            "id"=>$mid,
            "name"=>$name,
            "value"=>$price);
    }
    echo json_encode($result_data);
    
}
function getsellinglist() {
	global $conn;
    $result_data = array("inpData"=>array());
    $sql = "select pid, pname, price, num from product where pid != 0;";
	$result = mysqli_query($conn,$sql);
    while (($rs=mysqli_fetch_assoc($result))) {
        $num =intval($rs['num']);
        if(!$num)continue;
        $pid =$rs['pid'];
        $pname =$rs['pname'];
        $price =$rs['price'];
        $result_data["inpData"][] = array(
            "id"=>$pid,
            "name"=>$pname,
            "value"=>$price,
            "number"=>$num);
    }
    echo json_encode($result_data);
}
function getbomlist() {
	global $conn;
    $result_data = array("bom"=>array());
	$sql = "select * from product;";
    $result = mysqli_query($conn,$sql);
    while (($rs=mysqli_fetch_assoc($result))) {
        $anitem = array(
            "id"=>intval($rs['pid']),
            "name"=>$rs['pname'],
            "list"=>array(),
            "time"=>$rs['time']);

        if(!$anitem['id'])continue;
        $sql2 = "select b.mid ID, b.num Num, m.name Name from material m,bomlist b where m.mid = b.mid and b.pid = ".$rs['pid'];
        
        $result2 = mysqli_query($conn,$sql2);
        while (($rs2=mysqli_fetch_assoc($result2))) {
            $anitem["list"][] = array(
            "id"=>$rs2['ID'],
            "name"=>$rs2['Name'],
            "num"=>$rs2['Num']);
        }
        $result_data["bom"][] = $anitem;
    }
	echo json_encode($result_data);
}
function getwarehousedata() {
	global $conn;
    $a=array('machine'=>array(),'material'=>array(),'product'=>array());
	$sql = "select count(`tid`) CC from tool where tid is not null";
	$result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    $a["machine"][]=array(
    "name"=>"機器",
    "number"=>$rs['CC']);
    $sql2 = "select * from material ;";
	$result2 = mysqli_query($conn,$sql2);
    while ($rs2=mysqli_fetch_assoc($result2)) {
        $a["material"][]=array(
        "name"=>$rs2['name'],
        "number"=>$rs2['num']);
    }
    $sql3 = "select * from product ;";
	$result3 = mysqli_query($conn,$sql3);
    while ($rs3=mysqli_fetch_assoc($result3)) {
        if(!intval($rs3['num']))continue;
        $a["product"][]=array(
        "name"=>$rs3['pname'],
        "number"=>$rs3['num']);
    }
    $result_data = array("inpData"=>$a);
    echo json_encode($result_data);
}
function getcanproduce() {
    global $conn;
    $result_data = array("bom"=>array());
    $sql = "select * from product where pid in (SELECT DISTINCT pid from bomlist b inner join material m on b.mid = m.mid where b.num <= m.num);";
    $result = mysqli_query($conn,$sql);
    while (($rs=mysqli_fetch_assoc($result))) {
    $anitem = array(
            "id"=>$rs['pid'],
            "name"=>$rs['pname'],
            "list"=>array(),
            "time"=>$rs['time']);

        $sql2 = "select b.mid ID, b.num Num, m.name Name from material m,bomlist b where m.mid = b.mid and b.pid = ".$rs['pid'];
        
        $result2 = mysqli_query($conn,$sql2);
        while (($rs2=mysqli_fetch_assoc($result2))) {
            $anitem["list"][] = array(
            "id"=>$rs2['ID'],
            "name"=>$rs2['Name'],
            "num"=>$rs2['Num']);
        }
        $result_data["bom"][] = $anitem;
    }
	echo json_encode($result_data);
}
function checkout($Stype,$ShoppingCar) {
    global $conn;
    for($i=0;$i<count($ShoppingCar);$i++)
    {
        $typeYOO = (($Stype==1)?-1:1);
        $sql = "call BuySellThing(".$ShoppingCar[$i]['id'].",".$ShoppingCar[$i]['number'].",".$typeYOO.");";
        $result = mysqli_query($conn,$sql);
    }
}
?>