<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);
mysql_query("SET CHARACTER SET utf8");
$query = mysql_query('CALL ingresarHistorial("'.$objData->id_usuario.'","'.$objData->id_documento.'");') or die ("Error");
mysql_close($conexion);

?>