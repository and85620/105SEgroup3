
<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 0);
require("dbconnect.php");

$sql = "insert into product (pname, price, time) values ('"
	.$_GET["Pname"]."',".$_GET["Pprice"].",".$_GET["Ptime"].")";
mysqli_query($conn,$sql);

$sql = "SELECT LAST_INSERT_ID() LID;";
$result = mysqli_query($conn,$sql);
$rs=mysqli_fetch_assoc($result);
$PPAPID = intval($rs['LID']);


$materials = explode(" ",$_GET["Matls"]);
for($i=0;$i<count($materials);$i+=2)
{
	$sql = "insert into bomlist (pid,mid,num) values ("
	.$PPAPID.",".
	"(select mid from material where name='".$materials[$i]."')"
	.",".$materials[$i+1].")";
	mysqli_query($conn,$sql);
}


header('Location: insertData.php');
?>