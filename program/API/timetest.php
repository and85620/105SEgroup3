<?php
$tt = date("Y-m-d H:i:s");
$ss = sprintf("+%d seconds",100);
echo $ss."<br/>";
$tadder = date("Y-m-d H:i:s",strtotime($ss));

$tt2 = date("2016-12-23 08:15:21");

echo $tt2."<br/>";
echo $tadder."<br/>";
echo  strtotime($tt2)-strtotime($tt);
//echo date_diff($tadder,$tt);
?>