<!DOCTYPE html>
<html lang="en">
<head>
	<title>Document</title>
	<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
</head>
<body>
<style>
	input{
		width:80%;
		margin:10px;
	}
</style>
<form  action="insertDataP.php" method="get">
	<input type="text" name="Pname" placeholder="產品名稱"/>
	<input type="text" name="Pprice" placeholder="價錢"/>
	<input type="text" name="Ptime" placeholder="製作時間"/>
	<input type="text" name="Matls" placeholder="A 1 B 2 C 4"/>
	<input type="submit" value="Submit"  class="insertBom"/>
</form>
	<hr/>
<form  action="insertDataM.php" method="get">
	<input type="text" name="Mname" placeholder="物品名稱"/>
	<input type="text" name="Mprice" placeholder="價錢"/>
	<input type="submit" value="Submit"  class="insertMat"/>
</form>
</body>
</html>

