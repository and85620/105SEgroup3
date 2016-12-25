<?php
    header('Access-Control-Allow-Origin: *');
    ini_set('display_errors', 0);
    require("machine.php");
    require("database.php");
    $act =$_REQUEST["act"];
switch($act) {
	case "buy":
        if(buymachine()==1){
            echo 1;
        } else {
            echo 0;
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
    case "checkout":
        checkout($_POST["type"],json_decode($_POST["list"],true));
		break;
    case "finishproduce":
        $tid=$_GET['tid'];
        finishproduce($tid);
        break;
	default:
}
?>