<?php
require("dbconnect.php");
function startproduce($pid, $tid){
    global $conn;
    $pid = mysqli_real_escape_string($conn,$pid);
	$tid = mysqli_real_escape_string($conn,$tid);
    if ($tid) {
        $sql = 
        "update tool set pid = '$pid' , state = '1', resttime = '".
            getFinishTime($pid).
        "' where tid = $tid";
        $result = mysqli_query($conn, $sql);
        
    } else {
        return false;
    }
}
function getFinishTime($pid)
{
    global $conn;
    $sql = "select time from product where pid = $pid";
    $result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    $ss = sprintf("+%d seconds",intval($rs['time']) );
    return date("Y-m-d H:i:s",strtotime($ss));
}
function getmachinestate() {
	global $conn;
    $result_data = array("inpData"=>array());
    $sql = "select t.tid id,t.state status,p.pname produce,p.time restime from tool t,product p where t.pid = p.pid ;";
    $result = mysqli_query($conn,$sql);
    while (($rs=mysqli_fetch_assoc($result))) {
        $tid =$rs['id'];
        $state =$rs['status'];
        $pname =$rs['produce'];
        $result_data["inpData"][] = array(
            "id"=>$tid,
            "name"=>"機器",
            "status"=>$state,
            "produce"=>$pname,
            "restime"=>checktime($tid));
    }
    echo json_encode($result_data);
}
function checktime($tid) {
    global $conn;
    $tid = mysqli_real_escape_string($conn,$tid);
    $sql = "select resttime from tool where tid = $tid";
    $result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    return strtotime($rs['resttime'])-strtotime(date("Y-m-d H:i:s"));
}
?>