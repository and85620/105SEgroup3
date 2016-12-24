<?php
    require("machine.php");
    require("database.php");
    $act =$_REQUEST["act"];
switch($act) {
	case "buy":
        if(buyMachine()==1){
            echo "購買成功";
        } else {
            echo "資金不足";
        }
		break;
    case "buylist":
        getbuyinglist();
		break;
    case "playerdata":
        getplayerdata();
		break;
    case "bomlist":
        getbomlist();
		break;
    case "cando":
        getcanproduce();
		break;
    case "warehouse":
        getwarehousedata();
		break;
    case "machinestate":
        getmachinestate();
		break;
    case "selling":
        getsellinglist();
		break;
    case "startproduce":
        $pid=$_GET['pid'];
		$tid=$_GET['tid'];
        if ($tid) {
            if (startproduce($pid, $tid)) {
                echo 1;
            } else {
                echo 0;
            }
        } else {
            echo -1;
        }
		break;
	default:
}
?>