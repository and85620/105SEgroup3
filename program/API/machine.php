<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 0);
require("dbconnect.php");
function buymachine(){
    global $conn;
    $sql = "select * from player;";
    $result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    $money = $rs['money'];
    if ($money >= 500) {
        $sql2 = "insert into tool (state, pid, id, price, resttime) values ('0', '0','1','500','0')";
        $result2 = mysqli_query($conn,$sql2);
        $sql3 = "update player set money = money-500;";
        $result3 = mysqli_query($conn,$sql3);
        return 1;
    } else {
        return 0;
    }
}
function startproduce($pid, $tid){
    global $conn;
    $pid = mysqli_real_escape_string($conn,$pid);
	$tid = mysqli_real_escape_string($conn,$tid);
    if ($tid) {
        $sql = 
        "update tool set pid = '$pid' , state = '1', resttime = 
        '".getFinishTime($pid)."'
         where tid = $tid";
        $result = mysqli_query($conn, $sql);
        $sql2 = "select m.mid, m.num-b.num new from material m, bomlist b where m.mid = b.mid and b.pid = $pid";
        $result2 = mysqli_query($conn, $sql2);
        while ($rs2 = mysqli_fetch_assoc($result2)) {
            $mid = $rs2['mid'];
            $num = $rs2['new'];
            $sql3 = "update material set num = ".$num." where mid = ".$mid;
            $result3 = mysqli_query($conn, $sql3);
        }
        return true;
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
function checktime($tid) {
    global $conn;
    $tid = mysqli_real_escape_string($conn,$tid);
    $sql = "select resttime from tool where tid = $tid";
    $result = mysqli_query($conn,$sql);
    $rs=mysqli_fetch_assoc($result);
    return strtotime($rs['resttime'])-strtotime(date("Y-m-d H:i:s"));
}
function getmachinestate() {
	global $conn;
    $result_data = array("inpData"=>array());
    $sql = "select t.tid id,t.state status,p.pname produce,p.time restime from tool t,product p where t.pid = p.pid ;";
    $result = mysqli_query($conn,$sql);
    while (($rs=mysqli_fetch_assoc($result))) {
        $tid =$rs['id'];
        $MRRtime = checktime($tid);
        $state =intval($rs['status']);
        $pname =$rs['produce'];
        $result_data["inpData"][] = array(
            "id"=>$tid,
            "Name"=>"機器",
            "status"=>$state,
            "produce"=>($state?$pname:""),
            "restime"=>($state?$MRRtime:0) );
    }
    echo json_encode($result_data);
}
function finishproduce($tid) {
    global $conn;
    $tid = mysqli_real_escape_string($conn,$tid);
    $sql2 = "update product set num = num+1 where pid = (select pid from tool where tid=".$tid.")";
    $result2 = mysqli_query($conn, $sql2);
    $sql = "update tool set pid = 0 , state = 0 where tid = ".$tid;
    $result = mysqli_query($conn, $sql);
    return true;
}
?>